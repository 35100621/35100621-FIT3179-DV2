"""Rebuild V1 data from preserved originals and the official 2025 PDF.
Run: python3 scripts/prepare_data.py (requirements.txt). No imputation or source writes.
"""
from pathlib import Path
import hashlib,json,math,sys
import pandas as pd
import pdfplumber
from shapely import make_valid
from shapely.geometry import shape,mapping,MultiPolygon
from shapely.geometry.polygon import orient
from shapely.validation import explain_validity
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'public/data'; OUT.mkdir(parents=True,exist_ok=True)
DOC=ROOT/'docs';DOC.mkdir(exist_ok=True)
STATES=['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur','W.P. Labuan','W.P. Putrajaya']
YEARS=list(range(2015,2025)); checks=[]; outputs={}
def check(name,ok):
 if not bool(ok):raise ValueError(name)
 checks.append(name)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(name,obj):
 (OUT/name).write_text(json.dumps(obj,ensure_ascii=False,allow_nan=False,indent=2)+'\n')
def table(name,d):
 check(name+' has no null values',not d.isna().any().any())
 d.to_csv(OUT/(name+'.csv'),index=False,float_format='%.10f')
 write(name+'.json',json.loads(d.to_json(orient='records',double_precision=12)))
 outputs[name]={'rows':len(d),'columns':list(d.columns)}
def totals(path):
 d=pd.read_csv(ROOT/path);d['year']=d.date.str[:4].astype(int)
 return d.query("sex=='both' and ethnicity=='overall'")
# Every original and acquired raw file is checked against prior hash evidence.
originals=json.loads((ROOT/'data/additional/validation/original_hashes.json').read_text())
for p,h in originals.items():check('Original unchanged: '+p,sha(ROOT/p)==h)
manifest=pd.read_csv(ROOT/'data/additional/source_manifest.csv')
for x in manifest.itertuples():check('Acquired source unchanged: '+x.source_file,sha(ROOT/x.source_file)==x.sha256)
beds=pd.read_csv(ROOT/'hospital_beds.csv');beds['year']=beds.date.str[:4].astype(int)
pn=totals('population_malaysia.csv');ps=totals('population_state.csv')
nb=beds.query("state=='Malaysia' and district=='All' and type=='all'")
nt=pn.query("age=='overall' and year in @YEARS")
n=nb[['year','beds']].merge(nt[['year','population']],on='year',validate='one_to_one').sort_values('year')
check('All ten national years',n.year.tolist()==YEARS)
n['residents']=n.population*1000;n['beds_index']=n.beds/n.beds.iloc[0]*100;n['population_index']=n.population/n.population.iloc[0]*100
long=[]
for r in n.itertuples():
 for label,index,count in [('Public hospital beds',r.beds_index,r.beds),('Population',r.population_index,r.residents)]:long.append({'year':r.year,'series':label,'index':index,'count':int(round(count))})
table('indexed_growth',pd.DataFrame(long))
sb=beds.query("district=='All Districts' and type=='all'")
s=sb[['year','state','beds']].merge(ps.query("age=='overall' and year in @YEARS")[['year','state','population']],on=['year','state'],validate='one_to_one').sort_values(['state','year'])
check('Complete 16 by 10 grid',set(zip(s.state,s.year))=={(st,y) for st in STATES for y in YEARS})
s['residents']=s.population*1000;s['rate']=s.beds*10/s.population
check('State beds sum to national every year',s.groupby('year').beds.sum().equals(n.set_index('year').beds))
# DOSM rounded state estimates can differ slightly from the separately published national total.
pop_diffs=(s.groupby('year').population.sum()-n.set_index('year').population).to_dict()
check('Rounded state population within 1000 persons of national',max(abs(v) for v in pop_diffs.values())<=1)
s=s[['year','state','beds','residents','rate']];table('state_rates',s);s24=s[s.year==2024].copy();table('public_rates_2024',s24)
# Read selected pages directly from the untouched publication, not Figma/sample arrays.
pdfpath=ROOT/'data/additional/raw/PETUNJUK_KESIHATAN_2025.pdf'
with pdfplumber.open(pdfpath) as pdf:
 pages={pg:pdf.pages[pg-1].extract_text() for pg in [133,137,160,*range(140,153)]}
def values(v):return None if v=='-' else float(v.replace(',','').removesuffix('a'))
private=[];public=[];admissions=[]
for pg,target,cols in [(137,private,['private_hospitals','private_beds']),(133,public,['moh_hospitals','moh_hospital_beds','special_count','special_beds','moh_count','moh_beds','other_count','other_beds','public_count','public_beds']),(160,admissions,['moh_hospital','moh_special','other_government','private','total'])]:
 for line in pages[pg].splitlines():
  for st in STATES+['Malaysia']:
   label=st if st!='Malaysia' else 'MALAYSIA'
   if not line.startswith(label+' '):continue
   tokens=line[len(label):].split()
   if pg==137:tokens=tokens[:2]
   if pg==160 and st=='W.P. Kuala Lumpur':
    check('KL footnote attached to admissions value',tokens[3].endswith('3'));tokens[3]=tokens[3][:-1]
   check('PDF column count '+str(pg)+' '+st,len(tokens)==len(cols))
   target.append({'state':st,**dict(zip(cols,map(values,tokens)))})
pr=pd.DataFrame(private);pub=pd.DataFrame(public);adm=pd.DataFrame(admissions)
for name,d in [('private',pr),('public',pub),('admissions',adm)]:
 check(name+' PDF unique complete 17-region rows',len(d)==17 and d.state.nunique()==17 and set(d.state)==set(STATES+['Malaysia']))
 for c in d.columns[1:]:check(name+' national reconciliation '+c,math.isclose(d[d.state!='Malaysia'][c].sum(),d.loc[d.state=='Malaysia',c].iloc[0]))
check('Private 2024 table has explicit values',not pr.isna().any().any())
check('Public PDF totals match original state CSV',(pub[pub.state!='Malaysia'].set_index('state').public_beds.sort_index()==s24.set_index('state').beds.sort_index()).all())
c=s24.merge(pr[pr.state!='Malaysia'],on='state',validate='one_to_one').rename(columns={'beds':'public_beds','rate':'public_rate'})
c['combined_beds']=c.public_beds+c.private_beds;c['combined_rate']=c.combined_beds*10000/c.residents
c['public_rank']=c.public_rate.rank(ascending=False,method='min').astype(int);c['combined_rank']=c.combined_rate.rank(ascending=False,method='min').astype(int)
c['private_share']=c.private_beds/c.combined_beds*100
check('Capacity totals 52048/19920/71968',c.public_beds.sum()==52048 and c.private_beds.sum()==19920 and c.combined_beds.sum()==71968)
check('Pulau Pinang moves 15 to 4',c[c.state=='Pulau Pinang'].iloc[0].public_rank==15 and c[c.state=='Pulau Pinang'].iloc[0].combined_rank==4)
table('combined_capacity',c)
occupancy=[];state=None
uc=['official_beds','operational_beds','occupancy','admissions','daily_admissions','deaths','alos_days','turnover_days'];upper={x.upper():x for x in STATES}
for pg in range(140,153):
 for line in pages[pg].splitlines():
  if line in upper:state=upper[line]
  if line.startswith('Jumlah Negeri/State Total ') or line.startswith('MALAYSIA '):
   tokens=line.split()[-8:];occupancy.append({'state':'Malaysia' if line.startswith('MALAYSIA ') else state,'year':2024,**dict(zip(uc,map(values,tokens)))})
u=pd.DataFrame(occupancy);un=u[u.state=='Malaysia'].iloc[0];us=u[u.state!='Malaysia'].copy()
check('Annual occupancy all16state identifiers',len(us)==16 and set(us.state)==set(STATES))
for col in ['official_beds','operational_beds','admissions','deaths']:check('MOH annual total '+col,us[col].sum()==un[col])
check('Annual occupancy reference72.61',un.occupancy==72.61)
check('MOH annual admissions reconcile',(adm.moh_hospital+adm.moh_special.fillna(0)).sum()==2*un.admissions) # Malaysia + states; source dashes are non-additive absences here only
us['national_occupancy']=un.occupancy;table('occupancy',us[['state','year','occupancy','official_beds','operational_beds','national_occupancy']])
an=adm[adm.state=='Malaysia'].iloc[0]
providers=[('MOH hospitals','moh_hospital','97.94% MOH submission'),('Private-sector providers','private','82.33% private response'),('Other government hospitals','other_government','Separate non-MOH returns'),('MOH special institutions','moh_special','97.94% MOH submission')]
a=pd.DataFrame([{'provider':label,'admissions':int(an[col]),'year':2024,'coverage':coverage} for label,col,coverage in providers]);check('Admissions total4270356',a.admissions.sum()==4270356);table('admissions',a)
age=[];older=['65-69','70-74','75-79','80-84','85+']
for year in [2015,2024]:
 v=pn[(pn.year==year)&pn.age.isin(older)];check('Five65+age bins '+str(year),len(v)==5 and set(v.age)==set(older));total=pn[(pn.year==year)&(pn.age=='overall')].population.item();old=v.population.sum();age.append({'year':year,'older_residents':round(old*1000),'residents':round(total*1000),'share':old/total*100})
table('ageing',pd.DataFrame(age))
# Derived topology repair only. No simplification; explicit D3 clockwise winding.
g=json.loads((ROOT/'administrative_1_state.geojson').read_text());geolog=[];features=[]
def polygons(geom):
 if geom.geom_type=='Polygon':return [geom]
 return [p for part in geom.geoms for p in polygons(part)] if hasattr(geom,'geoms') else []
for f in g['features']:
 st=f['properties']['state'];old=shape(f['geometry']);fixed=make_valid(old) if not old.is_valid else old
 parts=polygons(fixed);check('Polygon parts retained '+st,len(parts)>0)
 geom=MultiPolygon([orient(p,sign=-1) for p in parts]);check('Valid derived boundary '+st,geom.is_valid and not geom.is_empty)
 delta=abs(geom.area-old.area)/old.area
 check('Area change under0.01percent '+st,delta<0.0001)
 geolog.append({'state':st,'valid_before':old.is_valid,'reason_before':explain_validity(old),'valid_after':geom.is_valid,'area_change_percent':delta*100,'parts_before':len(old.geoms) if hasattr(old,'geoms') else 1,'parts_after':len(parts),'bounds_unchanged':old.bounds==geom.bounds,'method':'make_valid then polygon components; clockwise D3 winding' if not old.is_valid else 'clockwise D3 winding only'})
 rate=s24[s24.state==st].iloc[0];features.append({'type':'Feature','properties':{**f['properties'],'rate':float(rate.rate),'beds':int(rate.beds),'residents':int(round(rate.residents))},'geometry':mapping(geom)})
check('All16boundaries join exactly',len(features)==16 and {f['properties']['state'] for f in features}==set(STATES))
# Report overlaps; no unstated clipping or correction of neighbouring state outlines.
overlaps=[]
for i,f in enumerate(features):
 for other in features[i+1:]:
  area=shape(f['geometry']).intersection(shape(other['geometry'])).area
  if area>1e-10:overlaps.append({'states':[f['properties']['state'],other['properties']['state']],'overlap_square_degrees':area})
check('No material interstate area overlaps',all(x['overlap_square_degrees']<0.001 for x in overlaps))
write('states.geojson',{'type':'FeatureCollection','features':features})
summary={'bed_growth':(n.beds.iloc[-1]/n.beds.iloc[0]-1)*100,'population_growth':(n.population.iloc[-1]/n.population.iloc[0]-1)*100,'private_beds':int(c.private_beds.sum()),'private_share':c.private_beds.sum()/c.combined_beds.sum()*100,'official_moh':int(un.official_beds),'operational_moh':int(un.operational_beds),'operational_gap':int(un.official_beds-un.operational_beds),'national_occupancy':float(un.occupancy),'age_increase':age[1]['share']-age[0]['share'],'declining_states':int((s.pivot(index='state',columns='year',values='rate')[2024]<s.pivot(index='state',columns='year',values='rate')[2015]).sum())}
write('summary.json',summary)
inputs={p:sha(ROOT/p) for p in ['hospital_beds.csv','population_malaysia.csv','population_state.csv','administrative_1_state.geojson','data/additional/raw/PETUNJUK_KESIHATAN_2025.pdf']}
for p,h in originals.items():check('After processing unchanged: '+p,sha(ROOT/p)==h)
validation={'status':'PASS','checks':checks,'chart_tables':outputs,'input_sha256':inputs,'geometry':geolog,'interstate_overlaps':overlaps,'population_rounding_difference_thousands':pop_diffs,'summary':summary,'limitations':['2024private licensed beds vs official public capacity; not operational availability','MOH submission97.94%, private response82.33%; no response-rate adjustment','Boundary effective vintage and reuse terms unresolved; local V1 only','Reported annual MOH occupancy, not present-day pressure','No invented/interpolated observations; all chart measures complete']}
(DOC/'data-validation.json').write_text(json.dumps(validation,indent=2,allow_nan=False)+'\n')
(DOC/'DATA_VALIDATION.md').write_text('# V1 data validation\n\nPASS — '+str(len(checks))+' assertions. Reproduce with `python3 scripts/prepare_data.py`.\n\n'+ '\n'.join('- '+x for x in checks)+'\n\n## Geometry\n\nOnly Sarawak required `make_valid`. No simplification or source edits. Clockwise polygon winding supports D3 rendering; winding is not a coordinate change. All16identifiers join, all derived shapes are valid. Full area/component/bounds and overlap diagnostics in `data-validation.json`. Boundary vintage is undocumented; geographic analysis is at state level only.\n\n## Definitions and limitations\n\n'+'\n'.join('- '+x for x in validation['limitations'])+'\n\nYear-end beds divided by same-year mid-year resident estimates. Population source units are thousands. Both/overall sex-age-ethnicity aggregate rows selected once; five65+bins summed without overall age. Full inputs and outputs are hashed in JSON. Source PDF is read directly at physical pages133,137,140–152,160; no sample Figma values used.\n')
print('PASS',len(checks),'checks; tables',outputs);print('Geometry repair',[x for x in geolog if not x['valid_before']]);print('Overlaps',overlaps)
