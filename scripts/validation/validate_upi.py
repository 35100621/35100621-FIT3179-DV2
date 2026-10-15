from pathlib import Path
import pandas as pd,json
b=Path(__file__).resolve().parents[2]/'data/additional'
d=pd.read_excel(b/'raw/Kod UPI_1303024.xlsx',dtype=str);d.columns=['state_code','state_name','district_code','district_name','locality_code','locality_name','section_code','section_name']
a={'sheet':'KOD UPI PINDAAN ','rows':len(d),'columns':8,'schema':{c:str(d[c].dtype) for c in d},'missing':{c:{'n':int(d[c].isna().sum()),'pct':100*float(d[c].isna().mean())} for c in d},'duplicate_rows':int(d.duplicated().sum()),'duplicate_code_keys':int(d.duplicated(['state_code','district_code','locality_code','section_code']).sum()),'states':d[['state_code','state_name']].drop_duplicates().to_dict('records'),'distinct_state_district_pairs':len(d[['state_code','district_code']].drop_duplicates()),'district_code_multiple_names':d.groupby(['state_code','district_code']).district_name.nunique().loc[lambda s:s>1].to_dict()}
a['district_code_multiple_names']={str(k):v for k,v in a['district_code_multiple_names'].items()}
# Assessment only; do not create a geographic crosswalk on similar names alone.
pop=pd.read_csv(b.parents[1]/'data/original/population_district.csv');names=pop[pop.date=='2024-01-01'][['state','district']].drop_duplicates();upi_names=set(d.district_name.dropna().str.upper().str.strip());a['population2024_district_names_absent_from_upi_any_state']=sorted(set(names.district.str.upper())-upi_names)
(b/'validation/upi_validation.json').write_text(json.dumps(a,indent=2));print(json.dumps(a,indent=2))
