"""Check preserved inputs, baseline chart values and intentional deployment copies."""
from pathlib import Path
import hashlib,json,re
ROOT=Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
audit=json.loads((ROOT/'reports/task04/inventory-before.json').read_text())
moves=json.loads((ROOT/'reports/task04/move-manifest.json').read_text())
checks=[]
for row in audit['files']:
 old=row['path'];new=moves.get(old,old)
 if row['category'] in ['original source — preserve bytes','acquired source/provenance — preserve bytes','approved design — preserve bytes','Task02 derived research','V1 chart data/runtime asset'] or old=='src/index.css':
  assert sha(ROOT/new)==row['sha256'],new
  checks.append(new)
for p in (ROOT/'data/processed').glob('*.csv'):assert p.read_bytes()==(ROOT/'public/data'/p.name).read_bytes()
assert (ROOT/'data/geographic/validated/states.geojson').read_bytes()==(ROOT/'public/data/states.geojson').read_bytes()
assert {p.name for p in (ROOT/'public/data').iterdir()}=={p.name for p in (ROOT/'data/processed').glob('*.csv')}|{'states.geojson'}
for p in [ROOT/'README.md',* (ROOT/'reports').glob('task0[123]/*.md')]:
 for link in re.findall(r'\]\(([^)]+)\)',p.read_text()):
  if '://' in link or link.startswith('#'):continue
  assert (p.parent/link.split('#')[0]).exists(),(p,link)
result={'status':'PASS','preserved_file_count':len(checks),'preserved_files':checks,'runtime_assets':sorted(p.name for p in (ROOT/'public/data').iterdir()),'baseline_chart_bytes_unchanged':True,'markdown_links_valid':True}
(ROOT/'reports/task04/preservation-validation.json').write_text(json.dumps(result,indent=2)+'\n')
print('PASS:',len(checks),'preserved source/design/derived/style/chart files; runtime copies and documentation links valid')
