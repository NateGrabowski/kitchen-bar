# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **home improvement design project** for a split-level kitchen bar. The goal is to replace an existing metal railing between the kitchen and living room with a bar that includes cabinet storage. The kitchen is 23.5" higher than the living room, creating unique design constraints.

Key project requirements:
- Seating on the **kitchen side** (looking out to living room)
- Butcher block countertop
- Storage cabinets accessible from living room or kitchen
- Electrical outlets for laptops/devices
- Approximately 84" (7 ft) bar length, 25"+ depth

## Project Structure

```
docs/
  kitchen-bar-project-brief.md   # Complete project requirements and constraints
  rough-notes.md                  # Initial brainstorm notes
  images/                         # Reference photos (.heic and .jpg)
  research/                       # Research on tools and capabilities

visualization/
  jsx/                            # Source React components (primary)
    hybrid-bar-options.jsx
    kitchen-bar-planner-v3.jsx
    kitchen-floor-cabinet-options.jsx
  threejs/
    kitchen-bar-v1.html           # 3D interactive visualization
  *.html                          # Legacy standalone HTML (may be outdated)

src/
  main.jsx                        # React entry point
  App.jsx                         # Visualization switcher with dropdown

package.json                      # Vite + React dependencies
vite.config.js                    # Vite configuration
index.html                        # Dev server entry point
```

## Use Playwright Skill to access this project

`C:\Users\nateg\.claude\plugins\marketplaces\playwright-skill`

```
playwright-skill/              # Plugin root
├── .claude-plugin/           # Plugin metadata
└── skills/
    └── playwright-skill/     # The actual skill
        └── SKILL.md
```


## Running Visualizations

### Vite Dev Server (Recommended)
```bash
npm run dev
```
Opens at http://localhost:5173 with a dropdown to switch between all visualizations. Hot reload on JSX changes.

### Adding New Artifacts
1. Save JSX from Claude to `visualization/jsx/new-viz.jsx`
2. Add import to `src/App.jsx`:
   ```js
   'new-viz': lazy(() => import('../visualization/jsx/new-viz.jsx')),
   ```
3. Appears in dropdown automatically

### Three.js 3D Visualization
Open `visualization/threejs/kitchen-bar-v1.html` directly in a browser. Controls: drag to rotate, scroll to zoom, right-drag to pan.

### Legacy HTML Files
The standalone `.html` files in `visualization/` may be outdated compared to the JSX source. Use the Vite dev server instead.

## Key Design Parameters

From `docs/kitchen-bar-project-brief.md`:

| Parameter | Baseline Value | Notes |
|-----------|---------------|-------|
| Step height | 23.5" | Living room floor to kitchen floor |
| Bar length | 84" | ~7 feet, fits 3-4 people (24" per seat) |
| Bar top height | 40" | From kitchen floor (range: 36-42") |
| Total bar depth | 28" | |
| Kitchen overhang | 12" | For knee clearance when seated |
| Bar top thickness | 1.5" | Butcher block minimum for this span |

## Design Configurations

The visualizations explore these cabinet placement options:

1. **Living-Room-Side Cabinets** - Cabinets mount below step, face into living room. Most flexible bar height but complex construction.

2. **Kitchen-Floor Cabinets** - Standard base cabinets on kitchen floor. Simpler but limited to counter height (~36").
   - Flush Peninsula - Cabinets align with step edge
   - Setback Peninsula - Cabinets pulled back, step visible
   - Tiered Top - Two-level: counter (36") + raised bar (42")
   - Ledge + Cabinets - Add separate LR-side shelf for drinks
   - Upper + Lower - Base cabinets + floating display shelves

## Working with Visualizations

When modifying the JSX visualizations:
- All use the same slider/control pattern with state management
- SVG diagrams use inline calculations based on config values
- Scale factor typically 1.8-2.5 (inches to pixels)
- Color scheme: dark background (#0a1628), blue accents (#60a5fa), amber for wood (#92400e)

The visualizations calculate and display derived values:
- Bar height from living room floor (step + bar height)
- Knee clearance for seating
- Seating capacity (bar length / 24")
- Stool height recommendations
