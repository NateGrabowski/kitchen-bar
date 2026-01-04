# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **home improvement design project** for a split-level kitchen bar. The goal is to replace an existing metal railing between the kitchen and living room with a bar that includes cabinet storage. The kitchen is 23.5" higher than the living room, creating unique design constraints.

Key project requirements:
- Seating on the **kitchen side** (looking out to living room)
- Butcher block countertop
- Continuous cabinet from bar top to living room floor (maximizes storage)
- Electrical outlets for laptops/devices
- Approximately 84" (7 ft) bar length, 28" depth

## Project Structure

```
docs/
  design-spec.md                  # Current baseline design spec
  kitchen-bar-project-brief.md    # Complete project requirements and constraints
  images/                         # Reference photos

visualization/jsx/
  kitchen-bar-planner-v4.jsx      # Main design tool (loads as "kitchen-bar-planner")
  kitchen-floor-cabinets-sketch.jsx
  archive/                        # Old iterations (v1, v2, v3)

src/
  main.jsx                        # React entry point
  App.jsx                         # Visualization switcher with dropdown

package.json                      # Vite + React dependencies
vite.config.js                    # Vite configuration
index.html                        # Dev server entry point
```

## Running Visualizations

```bash
npm run dev
```
Opens at http://localhost:5173. Default view is `kitchen-bar-planner`.

## Use Playwright Skill for Screenshots

```bash
# From skill directory
cd C:/Users/nateg/.claude/plugins/cache/playwright-skill/playwright-skill/4.1.0/skills/playwright-skill
node run.js /tmp/your-script.js
```

## Key Design Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Step height | 23.5" | Fixed - living room to kitchen floor |
| Bar length | 84" | ~7 feet, fits 3 people |
| Bar top height | 40" | From kitchen floor (range: 36-42") |
| Total depth | 28" | Front to back |
| Cabinet depth | 12" | Storage section |
| Knee space | 16" | Overhang for seating |
| Bar top thickness | 1.5" | Butcher block |

## Design Configuration

**Baseline: Flush**
- Single-level counter aligned with step
- Continuous cabinet from bar top to LR floor
- No tiered section

**Alternative: Tiered**
- Adds +6" raised bar section facing living room
- True bar height, hides kitchen mess

## Git Worktrees

Worktree directory: `.worktrees/` (project-local)

Create feature branches in isolation:
```bash
git worktree add .worktrees/<branch-name> -b <branch-name>
```

## Working with the Visualization

The main file is `visualization/jsx/kitchen-bar-planner-v4.jsx`:

- Config state at top controls all dimensions
- Step height is fixed (not adjustable - it's the actual floor)
- Presets: Flush (default), Tiered
- Side Section View is the primary design view (scale 2.4)
- Person faces toward living room
