"""Extract reviewed capacity/admissions and MOH state utilisation tables; never edit raw files.
PDF page numbers are one-based physical pages, printed page = physical - 1.
Dashes retained as null with raw-token provenance. Superscript 3 on KL admissions is removed explicitly.
"""
from pathlib import Path
import pandas as pd,json,re
b=Path(__file__).resolve().parents[2]/'data/additional'; root=b.parents[1]; out=b/'derived';out.mkdir(exist_ok=True)
states=['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur','W.P. Labuan','W.P. Putrajaya','Malaysia']
upper={s.upper():s for s in states}; frames={}
def num(v):return None if v=='-' else float(v.replace(',','').removesuffix('a'))
for kind,cols in [('private',['private_hospitals','private_hospital_beds']),('public',['moh_hospitals','moh_hospital_beds','moh_special_institutions','moh_special_beds','moh_total_facilities','moh_total_beds','other_public_hospitals','other_public_beds','public_total_facilities','public_total_beds']),('admissions',['moh_hospital_admissions','moh_special_admissions','other_public_admissions','private_admissions','total_admissions'])]:
 rows=[]
 for edition in [2024,2025]:
  pg={'private':{2024:136,2025:137},'public':{2024:131,2025:133},'admissions':{2024:144,2025:160}}[kind][edition]
  text=json.loads((b/f'validation/health_indicators_{edition}_pages.json').read_text())[pg-1]
  for line in text.splitlines():
   for s in states:
    label=s if s!='Malaysia' else 'MALAYSIA'
    if line.startswith(label+' '):
     tok=line[len(label):].split(); raw=' '.join(tok)
     if kind=='admissions' and s=='W.P. Kuala Lumpur':
      assert tok[3].endswith('3');tok[3]=tok[3][:-1]
     if kind=='private':tok=tok[:2]
     assert len(tok)==len(cols),(kind,s,tok)
     rows.append(dict(year=edition-1,state=s,**dict(zip(cols,map(num,tok))),source_file=f'PETUNJUK_KESIHATAN_{edition}.pdf',pdf_page=pg,table='4.4' if kind=='private' else '4.1' if kind=='public' else '4.11' if edition==2024 else '4.13',raw_tokens=raw))
 d=pd.DataFrame(rows);assert len(d)==34;assert not d.duplicated(['year','state']).any();d.to_csv(out/f'{kind}_state_2023_2024.csv',index=False);frames[kind]=d
rows=[]
cols=['official_beds','operational_beds','bor_percent','admissions','daily_admissions','deaths','alos_days','turnover_interval_days']
for edition,start,end,table in [(2025,140,152,'4.6'),(2024,195,208,'4.61')]:
 pages=json.loads((b/f'validation/health_indicators_{edition}_pages.json').read_text());state=None
 for pg in range(start,end+1):
  for line in pages[pg-1].splitlines():
   if line in upper:state=upper[line]
   if line.startswith('Jumlah Negeri/State Total ') or line.startswith('MALAYSIA '):
    tok=line.split()[-8:];s='Malaysia' if line.startswith('MALAYSIA ') else state
    assert s is not None
    rows.append(dict(year=edition-1,state=s,**dict(zip(cols,map(num,tok))),source_file=f'PETUNJUK_KESIHATAN_{edition}.pdf',pdf_page=pg,table=table))
u=pd.DataFrame(rows);assert len(u)==34,(len(u),u.state.tolist());assert not u.duplicated(['year','state']).any();u.to_csv(out/'moh_utilisation_state_2023_2024.csv',index=False)
checks={}
for k,d in frames.items():
 metrics=[c for c in d if pd.api.types.is_numeric_dtype(d[c]) and c not in ['year','pdf_page']]
 checks[k+'_state_minus_national']=(d[d.state!='Malaysia'].groupby('year')[metrics].sum(min_count=1)-d[d.state=='Malaysia'].set_index('year')[metrics]).to_dict()
checks['utilisation_additive_state_minus_national']=(u[u.state!='Malaysia'].groupby('year')[['official_beds','operational_beds','admissions','deaths']].sum()-u[u.state=='Malaysia'].set_index('year')[['official_beds','operational_beds','admissions','deaths']]).to_dict()
pop=pd.read_csv(root/'data/original/population_state.csv');pop=pop.query("sex=='both' and age=='overall' and ethnicity=='overall'");pop['year']=pop.date.str[:4].astype(int)
j=frames['public'].merge(frames['private'][['year','state','private_hospital_beds']],on=['year','state'],validate='one_to_one').merge(pop[['year','state','population']],on=['year','state'],how='left',validate='many_to_one')
# Malaysia is absent from state population: get national totals explicitly.
pn=pd.read_csv(root/'data/original/population_malaysia.csv').query("sex=='both' and age=='overall' and ethnicity=='overall'");pn['year']=pn.date.str[:4].astype(int)
for ix in j.index[j.state=='Malaysia']:j.loc[ix,'population']=pn.set_index('year').loc[j.loc[ix,'year'],'population']
# Preserve 2023 Labuan's dash as null even though reported national sums reconcile.
j['private_beds_for_combination']=j.private_hospital_beds
j['combined_beds']=j.public_total_beds+j.private_beds_for_combination
for c in ['public_total_beds','private_beds_for_combination','combined_beds']:j[c+'_per10000']=10*j[c]/j.population
for c in ['public_total_beds','combined_beds']:
 j[c+'_rank']=j[j.state!='Malaysia'].groupby('year')[c+'_per10000'].rank(ascending=False,method='min')
j['private_share_percent']=100*j.private_beds_for_combination/j.combined_beds
j.to_csv(out/'capacity_comparison_2023_2024.csv',index=False)
beds=pd.read_csv(root/'data/original/hospital_beds.csv');beds['year']=beds.date.str[:4].astype(int);beds=beds.query("type=='all' and (district=='All Districts' or (state=='Malaysia' and district=='All'))")
c=frames['public'].merge(beds[['year','state','beds']],on=['year','state'],validate='one_to_one');checks['public_pdf_csv_mismatches']=c[c.public_total_beds!=c.beds].to_dict('records')
a=frames['admissions'].copy();a['moh_sum']=a[['moh_hospital_admissions','moh_special_admissions']].sum(axis=1,min_count=1);c=a.merge(u[['year','state','admissions']],on=['year','state']);checks['moh_admissions_between_tables_mismatches']=c[c.moh_sum!=c.admissions].to_dict('records')
(b/'validation/indicator_checks.json').write_text(json.dumps(checks,indent=2));print(json.dumps(checks,indent=2));print(j[j.year==2024][['state','public_total_beds_per10000','combined_beds_per10000','public_total_beds_rank','combined_beds_rank','private_share_percent']].round(3).to_string(index=False))
