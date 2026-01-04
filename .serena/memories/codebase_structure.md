# Codebase Structure

```
kitchen-bar/
├── src/
│   ├── main.jsx              # React entry point
│   └── App.jsx               # Visualization switcher with dropdown
│
├── visualization/
│   ├── jsx/
│   │   ├── kitchen-bar-planner-v4.jsx    # Main design tool (current)
│   │   ├── kitchen-floor-cabinets-sketch.jsx
│   │   └── archive/                       # Old versions (v1, v2, v3)
│   └── threejs/
│       └── kitchen-bar-v1.html           # 3D experiment
│
├── docs/
│   ├── design-spec.md                    # Current baseline spec
│   ├── kitchen-bar-project-brief.md      # Full requirements
│   ├── images/                           # Reference photos
│   ├── plans/                            # Implementation plans
│   └── research/                         # Research notes
│
├── package.json              # Vite + React dependencies
├── vite.config.js            # Vite configuration
└── index.html                # Dev server entry
```

## Key Files
- **Main visualization**: `visualization/jsx/kitchen-bar-planner-v4.jsx`
- **Design spec**: `docs/design-spec.md`
- **Requirements**: `docs/kitchen-bar-project-brief.md`
