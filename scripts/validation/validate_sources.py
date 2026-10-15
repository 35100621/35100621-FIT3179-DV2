"""Read-only validation. Requires pandas, pyarrow, shapely and pdfplumber.
Run from any directory. Raw/original sources are never modified.
"""
from pathlib import Path
import json, hashlib, sys
import pandas as pd
import numpy as np
from shapely.geometry import shape
from shapely.validation import explain_validity
root=Path(__file__).resolve().parents[2];base=root/'data/additional';raw=base/'raw';out=base/'validation'
audit={};frames={}
for p in sorted(raw.iterdir()):
 if p.suffix in ['.csv','.parquet']:
  d=pd.read_csv(p) if p.suffix=='.csv' else pd.read_parquet(p)
  if 'date' in d: d['date']=d.date.astype(str)
  frames[p.name]=d
  key=['date','state','hospital'] if 'hospital' in d and 'date' in d else ['state','hospital'] if 'hospital' in d else ['state','type','date'] if 'staff' in d else ['state','date'] if 'state' in d and 'date' in d else ['state'] if 'state' in d else ['KOD_FASILITI'] if 'KOD_FASILITI' in d else []
  audit[p.name]={'rows':len(d),'columns':len(d.columns),'schema':{c:str(d[c].dtype) for c in d},'missing':{c:{'n':int(d[c].isna().sum()),'pct':float(d[c].isna().mean()*100)} for c in d},'duplicate_rows':int(d.duplicated().sum()),'key':key,'duplicate_keys':int(d.duplicated(key).sum()) if key else None,'numeric_ranges':{c:{'min':d[c].min(),'max':d[c].max(),'negative':int(d[c].lt(0).sum())} for c in d.select_dtypes('number')},'categories':{c:d[c].dropna().unique().tolist() for c in d.select_dtypes('object') if d[c].nunique()<=20}}
  if 'date' in d:
   a=audit[p.name];a.update(date_min=str(d.date.min()),date_max=str(d.date.max()),dates=int(d.date.nunique()))
   if p.suffix=='.parquet':
    dates=pd.to_datetime(d.date);a['missing_calendar_dates']=[x.strftime('%Y-%m-%d') for x in pd.date_range(dates.min(),dates.max()).difference(dates.unique())]
    a['rows_per_date']=d.groupby('date').size().to_dict()
    a['above100']={c:int(d[c].gt(100).sum()) for c in d if c.startswith('util_')}
  if (root/('data/geographic/original' if p.suffix=='.geojson' else 'data/original')/p.name).exists():
   orig=pd.read_csv(root/('data/geographic/original' if p.suffix=='.geojson' else 'data/original')/p.name);a=audit[p.name];a['same_as_original_values']=d.equals(orig)
   if d.shape==orig.shape:
    neq=(d.ne(orig)&~(d.isna()&orig.isna()));a['changed_cells']=[{'row_index':int(i),'column':c,'original':str(orig.at[i,c]),'downloaded':str(d.at[i,c])} for i,c in zip(*np.where(neq.values)) for c in [d.columns[c]]]
 elif p.suffix=='.geojson':
  g=json.loads(p.read_text());props=pd.DataFrame([x['properties'] for x in g['features']]);audit[p.name]={'features':len(props),'schema':{c:str(props[c].dtype) for c in props},'crs':g.get('crs'),'duplicate_properties':int(props.duplicated().sum()),'missing':props.isna().sum().to_dict(),'invalid':[{'properties':x['properties'],'reason':explain_validity(shape(x['geometry']))} for x in g['features'] if not shape(x['geometry']).is_valid], 'same_as_original_values':g==json.loads((root/('data/geographic/original' if p.suffix=='.geojson' else 'data/original')/p.name).read_text())}
metrics=['beds_nonicu','util_nonicu','beds_icu','util_icu','vent','util_vent']
for level in ['facility','state']:
 ts=frames['bedutil_02_timeseries_'+level+'.parquet'];snap=pd.read_csv(root/('data/original/bedutil_'+level+'.csv'));keys=['state','hospital'] if level=='facility' else ['state'];snap=snap.set_index(keys).sort_index();scores=[]
 for date,d in ts.groupby('date'):
  v=d.set_index(keys).sort_index().reindex(snap.index)
  aa=snap[metrics].to_numpy();bb=v[metrics].to_numpy();equal=np.isclose(aa,bb,rtol=1e-10,atol=1e-9,equal_nan=True)
  scores.append({'date':date,'matching_cells':int(equal.sum()),'total_cells':int(equal.size),'fully_matching_rows':int(equal.all(axis=1).sum()),'rows_on_date':len(d)})
 audit['snapshot_date_match_'+level]=sorted(scores,key=lambda r:r['matching_cells'],reverse=True)[:5]
ts=frames['bedutil_02_timeseries_facility.parquet'];ss=frames['bedutil_02_timeseries_state.parquet']
audit['utilisation_diagnostics']={'facility_missing_all_metrics':int(ts[metrics].isna().all(axis=1).sum()),'negative_rows':ts[(ts[metrics]<0).any(axis=1)].to_dict('records'),'n_hospitals':ts.hospital.nunique(),'facility_date_counts':ts.groupby('hospital').date.nunique().describe().to_dict()}
last=ts[ts.date==ts.date.max()];audit['last_facility_date']=last.to_dict('records')
common=ts.groupby(['date','state'])[['beds_nonicu','beds_icu','vent']].sum(min_count=1).reset_index().merge(ss[ss.state!='Malaysia'],on=['date','state'],suffixes=('_facility','_state'))
audit['utilisation_reconciliation']={'common_state_dates':len(common),'capacity_mismatch_rows':{c:int(~np.isclose(common[c+'_facility'],common[c+'_state'],equal_nan=True).sum()) for c in []}}
audit['utilisation_reconciliation']['capacity_mismatch_rows']={c:int((~np.isclose(common[c+'_facility'],common[c+'_state'],equal_nan=True)).sum()) for c in ['beds_nonicu','beds_icu','vent']}
monthly=ts.assign(month=ts.date.str[:7]).groupby('month').agg(rows=('date','size'),nonicu_reported=('util_nonicu','count'),icu_reported=('util_icu','count'));audit['monthly_completeness']=monthly.reset_index().to_dict('records')
staff=frames['healthcare_staff.csv'];pop=pd.read_csv(root/'data/original/population_state.csv').query("sex=='both' and age=='overall' and ethnicity=='overall'")
j=staff[staff.state!='Malaysia'].merge(pop,on=['state','date'],how='left',validate='many_to_one');j['per10000']=j.staff*10/j.population
audit['staff_join']={'rows':len(j),'unmatched_population':int(j.population.isna().sum()),'national':staff[staff.state=='Malaysia'].to_dict('records'),'rates2022':j[j.date=='2022-01-01'][['state','type','staff','population','per10000']].to_dict('records')}
tot=staff[staff.state!='Malaysia'].groupby(['date','type']).staff.sum();nt=staff[staff.state=='Malaysia'].set_index(['date','type']).staff;audit['staff_reconciliation']={'nonzero_state_minus_national':{str(k):int(v) for k,v in (tot-nt).items() if v!=0}}
out.joinpath('validation_results.json').write_text(json.dumps(audit,indent=2,default=lambda x:x.item() if hasattr(x,'item') else str(x)))
print('Validated',len(frames),'tabular files. Snapshot matches:',audit['snapshot_date_match_facility'][:2],audit['snapshot_date_match_state'][:2]);print('Staff',staff.groupby('type').size().to_dict());print('Reconciliation',audit['utilisation_reconciliation']);print('Negatives',len(audit['utilisation_diagnostics']['negative_rows']))
