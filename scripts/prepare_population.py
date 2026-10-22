"""Prepare population-pyramid data without modifying source files.
Uses the Python standard library.
"""
import csv, json, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data/processed'
PUBLIC=ROOT/'public/data'
def read(path): return list(csv.DictReader(open(ROOT/path)))
def save(name, rows):
 (OUT/f'{name}.json').write_text(json.dumps(rows,indent=2)+'\n')
 with (OUT/f'{name}.csv').open('w') as f:
  w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
 (PUBLIC/f'{name}.csv').write_bytes((OUT/f'{name}.csv').read_bytes())
source_paths=['data/original/population_malaysia.csv']
hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in source_paths}
ages=[f'{n}-{n+4}' for n in range(0,85,5)]+['85+']
national=read(source_paths[0])
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

assert all(hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==h for p,h in hashes.items())
report=dict(source_sha256=hashes,pyramid_rows=len(pyramid),rounding_residuals=rounding)
(ROOT/'docs/validation').mkdir(parents=True,exist_ok=True)
(ROOT/'docs/validation/population.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
