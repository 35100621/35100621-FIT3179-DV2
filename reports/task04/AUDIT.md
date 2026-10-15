# Repository audit before relocation

Full file inventory, sizes, categories, tracking status and SHA-256: [inventory-before.json](inventory-before.json). Generated dependency/build/browser-output directories are counted separately, including their nested files. No files were deleted during this audit.

Original structure: 11 original datasets at root; acquisitions, derived tables and validation scripts/evidence under data/additional; reports 01–12 together; Task03 records under docs; Figma under design_reference; chart-ready files under public/data.

Active website: src, index.html, package/TypeScript/Vite configuration and public/data. Reproduction: original/acquired inputs, manifests, validation evidence and Python scripts. Preserve all originals, acquired raw files, Figma files and research findings. node_modules, dist, test-results, .DS_Store and tsbuildinfo are reproducible/cache candidates; retained locally and ignored. No deletion is required.

Exact duplicate groups (retained where acquisition provenance differs):

References needing repair: Python root/source paths; report relative links; src data/style imports; original hash manifest path keys; canonical processed/output paths; README; preview test base. Public geometry and download CSVs remain deliberate deployment copies.
