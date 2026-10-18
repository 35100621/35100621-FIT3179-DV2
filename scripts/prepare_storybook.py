"""Preprocess equal-area capacity cartogram and binary admissions treemap for Vega-Lite.
Requires shapely==2.2.0. Does not modify research inputs.
"""
import json, math, hashlib
from pathlib import Path
from shapely.geometry import shape, mapping
from shapely.ops import transform
from shapely.affinity import scale, translate
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data/processed'
paths=['data/geographic/validated/states.geojson','data/processed/combined_capacity.json','data/processed/admissions.json']
hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in paths}
geo=json.loads((ROOT/paths[0]).read_text())['features']
capacity=json.loads((ROOT/paths[1]).read_text())
rows=[next(r for r in capacity if r['state']==f['properties']['state']) for f in geo]
assert len(rows)==16 and sum(r['combined_beds'] for r in rows)==71968
# Equal-area cylindrical projection: x=lambda, y=sin(phi). Uniform shape scaling
# uses projected area, not square degrees. Translation separates overlaps only.
project=lambda x,y,z=None:(math.radians(x),math.sin(math.radians(y)))
original=[transform(project,shape(f['geometry'])) for f in geo]
assert all(g.is_valid for g in original)
k=sum(g.area for g in original)*.32/sum(r['combined_beds'] for r in rows)
polygons=[]
for g,r in zip(original,rows):
 factor=math.sqrt(k*r['combined_beds']/g.area)
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
assert all(abs(g.area/(r['combined_beds']*k)-1)<1e-8 for g,r in zip(polygons,rows))
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
features=[]; outlines=[]
for g,o,r in zip(polygons,original,rows):
 features.append(dict(type='Feature',properties=r,geometry=mapping(transform(screen,g))))
 outlines.append(dict(type='Feature',properties=r,geometry=mapping(transform(screen,o))))
for name,featureset in [('capacity_cartogram',features),('capacity_geography',outlines)]:
 (OUT/f'{name}.json').write_text(json.dumps(featureset,separators=(',',':'))+'\n')

activity=json.loads((ROOT/paths[2]).read_text())
total=sum(r['admissions'] for r in activity)
assert total==4270356
rects=[]
def partition(items,x0,y0,x1,y1):
 if len(items)==1:
  r=items[0];rects.append(dict(**r,share=r['admissions']/total*100,x0=x0,y0=y0,x1=x1,y1=y1,cx=(x0+x1)/2,cy=(y0+y1)/2));return
 amount=sum(r['admissions'] for r in items)
 cut=min(range(1,len(items)),key=lambda i:abs(sum(r['admissions'] for r in items[:i])-amount/2))
 ratio=sum(r['admissions'] for r in items[:cut])/amount
 if x1-x0>=y1-y0:
  mid=x0+(x1-x0)*ratio
  partition(items[:cut],x0,y0,mid,y1);partition(items[cut:],mid,y0,x1,y1)
 else:
  mid=y0+(y1-y0)*ratio
  partition(items[:cut],x0,y0,x1,mid);partition(items[cut:],x0,mid,x1,y1)
partition(activity,0,0,1,1)
assert all(abs((r['x1']-r['x0'])*(r['y1']-r['y0'])-r['admissions']/total)<1e-12 for r in rects)
(OUT/'admissions_treemap.json').write_text(json.dumps(rects,indent=2)+'\n')
assert all(hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h for p,h in hashes.items())
report=dict(source_sha256=hashes,states=len(rows),combined_beds=71968,cartogram_area_proportionality=True,cartogram_overlap_pairs=0,separation_iterations=iteration,admissions=total,treemap_area_proportionality=True,providers=len(rects))
(ROOT/'reports/task07/data-validation.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
