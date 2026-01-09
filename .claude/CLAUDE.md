## Project Overview

This is a **home improvement design project** for a split-level kitchen bar. The goal is to replace an existing metal railing between the kitchen and living room with a bar that includes cabinet storage. The kitchen is 23.5" higher than the living room, creating unique design constraints.

Key project requirements:
- Seating on the **kitchen side** (looking out to living room)
- Butcher block countertop
- Continuous cabinet from bar top to kitchen floor (maximizes storage)
- Electrical outlets for laptops/devices

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

  - Located in `public/`
  - **Project Brief** — `kitchen-bar-project-brief.md`

## Git Worktrees

Worktree directory: `.worktrees/` (project-local)

Create feature branches in isolation:
```bash
git worktree add .worktrees/<branch-name> -b <branch-name>
```

## Working with the Visualization

The main file is `visualization/jsx/kitchen-floor-cabinets-sketch.jsx`:
