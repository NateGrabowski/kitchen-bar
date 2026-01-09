# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **home improvement design project** for a split-level kitchen bar. The goal is to replace an existing metal railing between the kitchen and living room with a bar that includes cabinet storage. The kitchen is 23.5" higher than the living room, creating unique design constraints.

Key project requirements:
- Seating on the **kitchen side** (looking out to living room)
- Butcher block countertop
- Continuous cabinet from bar top to kitchen floor (maximizes storage)
- Electrical outlets for laptops/devices
- Approximately 84" (7 ft) bar length, 28" depth

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

Quick Stats

| What          | Measurement                               |
| ------------- | ----------------------------------------- |
| Step height   | 23.5" (can't change this - it's my floor) |
| Bar length    | ~92" (fits 3-4 people comfortably)          |
| Bar depth     | 28" total                                 |
| Bar top       | Butcher block, 1.5" thick                 |
| Bar height    | ~40"                                      |
| Cabinet Depth | ~15"                                      |


## Git Worktrees

Worktree directory: `.worktrees/` (project-local)

Create feature branches in isolation:
```bash
git worktree add .worktrees/<branch-name> -b <branch-name>
```

## Working with the Visualization

The main file is `visualization/jsx/kitchen-floor-cabinets-sketch.jsx`:

- Config state at top controls all dimensions
- Step height is fixed (not adjustable - it's the actual floor)
- Presets: Flush (default), Tiered
- Side Section View is the primary design view (scale 2.4)
- Person faces toward living room
