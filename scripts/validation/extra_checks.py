from pathlib import Path
import pandas as pd,numpy as np,json,hashlib
b=Path(__file__).resolve().parents[2]/'data/additional';root=b.parents[1];r=b/'raw';a={}
# Restore complete acquisition metadata for files fetched concurrently with the long PDF extraction.
p=b/'validation/acquisition_log.json';log=json.loads(p.read_text())
for name,remote in [('covid_hospital.csv','hospital.csv'),('covid_icu.csv','icu.csv'),('covid_epidemic_README.md','README.md')]:
 if not any(x.get('source_file','').endswith('/'+name) for x in log):
  f=r/name;log.append(dict(source_file=str(f.relative_to(root)),url='https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/'+remote,accessed='2026-10-15',bytes=f.stat().st_size,sha256=hashlib.sha256(f.read_bytes()).hexdigest(),http_status=200))
if not any(x.get('name')=='covid_LICENSE' for x in log):log.append(dict(name='covid_LICENSE',url='https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/LICENSE',error='HTTP Error 404: Not Found'))
p.write_text(json.dumps(log,indent=2))
for n in ['covid_hospital.csv','covid_icu.csv']:
 d=pd.read_csv(r/n);dates=pd.to_datetime(d.date);nums=d.select_dtypes('number');a[n]={'rows':len(d),'states':sorted(d.state.unique()),'min_date':d.date.min(),'max_date':d.date.max(),'missing_calendar_days':len(pd.date_range(dates.min(),dates.max()).difference(dates.unique())),'missing_state_date_combinations':len(pd.date_range(dates.min(),dates.max()))*d.state.nunique()-len(d),'negative_cells':int((nums<0).sum().sum()),'missing_cells':int(d.isna().sum().sum()),'duplicate_keys':int(d.duplicated(['date','state']).sum())}
 if n=='covid_icu.csv':
  a[n]['icu_capacity_identity_mismatches']=int((d.beds_icu+d.beds_icu_rep!=d.beds_icu_total).sum());occ=d[['icu_covid','icu_pui','icu_noncovid']].sum(axis=1);a[n]['occupancy_exceeds_total_beds']=int((occ>d.beds_icu_total).sum());a[n]['zero_total_beds']=int((d.beds_icu_total==0).sum())
 else:a[n]['stock_exceeds_beds']=int((d[['hosp_covid','hosp_pui','hosp_noncovid']].sum(axis=1)>d.beds).sum())
 pop=pd.read_csv(root/'data/original/population_state.csv');a[n]['unmatched_state_names']=sorted(set(d.state)-set(pop.state))
d=pd.read_csv(r/'ckaps_private_hospitals.csv');a['ckaps']={'rows':len(d),'sum_beds':int(d.JUMLAH_KATIL.sum()),'duplicate_serial':int(d.BIL.duplicated().sum()),'duplicate_state_name_address':int(d.duplicated(['NEGERI','NAMA_PENUH_FASILITI','ALAMAT']).sum()),'by_state':d.groupby('NEGERI').agg(hospitals=('BIL','size'),beds=('JUMLAH_KATIL','sum')).reset_index().to_dict('records')}
d=pd.read_parquet(r/'bedutil_02_timeseries_facility.parquet');a['daily_extreme']=d.loc[d.util_nonicu.idxmax()].to_dict();a['negative_by_hospital']=d[d.beds_nonicu<0].groupby('hospital').size().to_dict()
s=pd.read_parquet(r/'bedutil_02_timeseries_state.parquet');idx=pd.MultiIndex.from_product([s.date.unique(),s.state.unique()],names=['date','state']);a['missing_state_date_rows']=[str(x) for x in idx.difference(s.set_index(['date','state']).index)]
f=pd.read_csv(r/'healthcare_staff.csv');parts=f[f.type!='all'].groupby(['date','state']).staff.sum();allv=f[f.type=='all'].set_index(['date','state']).staff;a['staff_component_sum_mismatches']=int((parts!=allv.reindex(parts.index)).sum())
a['originals_preserved']={k:hashlib.sha256((root/k).read_bytes()).hexdigest()==v for k,v in json.loads((b/'validation/original_hashes.json').read_text()).items()}
(b/'validation/extra_checks.json').write_text(json.dumps(a,indent=2,default=str));print(json.dumps(a,indent=2,default=str))
h=pd.read_csv(r/'covid_hospital.csv')
a['covid_hospital.csv']['admission_component_identity_mismatches']=int((h.admitted_total!=h.admitted_covid+h.admitted_pui).sum())
a['covid_hospital.csv']['discharge_component_identity_mismatches']=int((h.discharged_total!=h.discharged_covid+h.discharged_pui).sum())
for level in ['facility','state']:
 v=pd.read_parquet(r/f'bedutil_01_table_{level}.parquet');o=pd.read_csv(root/f'data/original/bedutil_{level}.csv');keys=['state','hospital'] if level=='facility' else ['state'];cols=['beds_nonicu','util_nonicu','beds_icu','util_icu','vent','util_vent']
 a['parquet_snapshot_matches_original_'+level]=bool(np.isclose(v.set_index(keys).sort_index()[cols],o.set_index(keys).sort_index()[cols],equal_nan=True).all())
(b/'validation/extra_checks.json').write_text(json.dumps(a,indent=2,default=str))
