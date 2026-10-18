"""Reproduce approved advanced-chart inputs. Originals and existing outputs are read-only.
Run with Python + shapely==2.2.0 (scripts/requirements.txt).
"""
import csv, json, math, hashlib
from pathlib import Path
from shapely.geometry import shape, mapping
from shapely.ops import transform
from shapely.affinity import scale, translate
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data/processed'
PUBLIC=ROOT/'public/data'
def read(path): return list(csv.DictReader(open(ROOT/path)))
def save(name, rows):
 (OUT/f'{name}.json').write_text(json.dumps(rows,indent=2)+'\n')
 with (OUT/f'{name}.csv').open('w') as f:
  w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
 (PUBLIC/f'{name}.csv').write_bytes((OUT/f'{name}.csv').read_bytes())
source_paths=['data/original/population_malaysia.csv','data/original/population_state.csv','data/additional/derived/public_state_2023_2024.csv','data/additional/derived/private_state_2023_2024.csv','data/geographic/validated/states.geojson']
hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in source_paths}
ages=[f'{n}-{n+4}' for n in range(0,85,5)]+['85+']
older=set(ages[13:])
national=read(source_paths[0]); statepop=read(source_paths[1])
def population(rows, year, sex, age, state=None):
 found=[r for r in rows if r['date']==f'{year}-01-01' and r['sex']==sex and r['age']==age and r['ethnicity']=='overall' and (state is None or r['state']==state)]
 assert len(found)==1,(year,sex,age,state,len(found))
 return round(float(found[0]['population'])*1000)
pyramid=[]; rounding=[]
for year in [2015,2024]:
 total=population(national,year,'both','overall')
 for sex in ['male','female']:
  for age in ages:
   count=population(national,year,sex,age)
   pyramid.append(dict(year=year,sex=sex,age=age,residents=count,share=count/total*100,signed_share=count/total*100*(-1 if sex=='male' else 1)))
  rounding.append(dict(year=year,sex=sex,age_bin_sum_minus_published_total=sum(r['residents'] for r in pyramid if r['year']==year and r['sex']==sex)-population(national,year,sex,'overall')))
assert len(pyramid)==72
save('population_pyramid',pyramid)
geo=json.loads((ROOT/source_paths[4]).read_text())['features']
rows=[]
for feature in geo:
 state=feature['properties']['state']; count=sum(population(statepop,2024,'both',age,state) for age in older)
 total=population(statepop,2024,'both','overall',state)
 rows.append(dict(state=state,year=2024,older_residents=count,residents=total,older_share=count/total*100))
assert len(rows)==16 and len({r['state'] for r in rows})==16
save('ageing_states',rows)
# Equal-area cylindrical projection: x=lambda, y=sin(phi). Uniform shape scaling
# uses projected area, not square degrees. Translation separates overlaps only.
project=lambda x,y,z=None:(math.radians(x),math.sin(math.radians(y)))
original=[transform(project,shape(f['geometry'])) for f in geo]
assert all(g.is_valid for g in original)
k=sum(g.area for g in original)*.32/sum(r['older_residents'] for r in rows)
polygons=[]
for g,r in zip(original,rows):
 factor=math.sqrt(k*r['older_residents']/g.area)
 polygons.append(scale(g,xfact=factor,yfact=factor,origin=g.centroid))
# Deterministic collision separation, keeping initial geographic arrangement.
for iteration in range(3000):
 collision=False
 for i in range(16):
  for j in range(i):
   if polygons[i].distance(polygons[j]) >= .00045: continue
   collision=True
   a,b=polygons[i].centroid,polygons[j].centroid
   dx,dy=a.x-b.x,a.y-b.y; length=math.hypot(dx,dy)
   if length<1e-12: dx,dy,length=1,0,1
   step=.00015
   polygons[i]=translate(polygons[i],xoff=dx/length*step,yoff=dy/length*step)
   polygons[j]=translate(polygons[j],xoff=-dx/length*step,yoff=-dy/length*step)
 if not collision: break
assert not collision,'Cartogram separation did not converge'
assert all(polygons[i].intersection(polygons[j]).area<1e-15 for i in range(16) for j in range(i))
assert all(abs(g.area/(r['older_residents']*k)-1)<1e-8 for g,r in zip(polygons,rows))
all_shapes=original+polygons
minx=min(g.bounds[0] for g in all_shapes);maxx=max(g.bounds[2] for g in all_shapes)
miny=min(g.bounds[1] for g in all_shapes);maxy=max(g.bounds[3] for g in all_shapes)
unit=960/(maxx-minx); height=(maxy-miny)*unit+50
screen=lambda x,y,z=None:((x-minx)*unit+20,(maxy-y)*unit+25)
def svg_path(g):
 parts=[]
 for poly in (g.geoms if g.geom_type=='MultiPolygon' else [g]):
  for ring in [poly.exterior,*poly.interiors]:
   parts.append('M'+'L'.join(f'{x:.4f},{y:.4f}' for x,y in ring.coords)+'Z')
 return ''.join(parts)
maprows=[]
for g,o,r in zip(polygons,original,rows):
 sg=transform(screen,g); anchor=sg.representative_point()
 maprows.append(dict(**r,path=svg_path(sg),outline=svg_path(transform(screen,o)),x=anchor.x,y=anchor.y,bounds=list(transform(screen,o).union(sg).bounds),region='East Malaysia' if r['state'] in ['Sabah','Sarawak','W.P. Labuan'] else 'Peninsular'))
(OUT/'ageing_cartogram.json').write_text(json.dumps(dict(width=1000,height=height,states=maprows),separators=(',',':'))+'\n')
public=next(r for r in read(source_paths[2]) if r['year']=='2024' and r['state']=='Malaysia')
private=next(r for r in read(source_paths[3]) if r['year']=='2024' and r['state']=='Malaysia')
leaves=[('MOH hospitals','Public','moh_hospital_beds',public),('MOH special institutions','Public','moh_special_beds',public),('Other government hospitals','Public','other_public_beds',public),('Licensed private hospitals','Private','private_hospital_beds',private)]
providers=[dict(category=name,sector=sector,beds=int(float(row[field]))) for name,sector,field,row in leaves]
assert sum(r['beds'] for r in providers)==71968
for r in providers:r['share']=r['beds']/71968*100
save('provider_composition',providers)
assert all(hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h for p,h in hashes.items())
report=dict(source_sha256=hashes,pyramid_rows=len(pyramid),state_rows=len(rows),provider_total=71968,cartogram_overlap_pairs=0,cartogram_area_proportionality_pass=True,separation_iterations=iteration,rounding_residuals=rounding,state_older_sum=sum(r['older_residents'] for r in rows),national_older_sum=sum(population(national,2024,'both',a) for a in older),note='Published rounded estimates retained; state older sum exceeds national by 200 residents. Cartogram locations are displaced for legibility, not administrative geometry.')
(ROOT/'reports/task06/data-validation.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='source_sha256'},indent=2))
