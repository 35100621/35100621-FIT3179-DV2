"""Locate state symbols inside largest validated polygons; these are not hospital coordinates."""

from pathlib import Path
import json
from shapely.geometry import shape

root = Path(__file__).resolve().parents[1]
capacity = json.loads((root / "data/processed/combined_capacity.json").read_text())
features = json.loads((root / "data/geographic/validated/states.geojson").read_text())[
    "features"
]
locations = {}
for f in features:
    g = shape(f["geometry"])
    polygon = max(g.geoms, key=lambda p: p.area) if g.geom_type == "MultiPolygon" else g
    point = polygon.representative_point()
    assert polygon.contains(point)
    locations[f["properties"]["state"]] = {"longitude": point.x, "latitude": point.y}
assert len(locations) == len(capacity) == 16
rows = [{**d, **locations[d["state"]]} for d in capacity]
assert sum(d["private_beds"] for d in rows) == 19920
(root / "data/processed/private_bed_locations.json").write_text(
    json.dumps(rows, indent=2) + "\n"
)
print(
    "16 interior state positions; 19,920 licensed private beds; source files unchanged"
)
