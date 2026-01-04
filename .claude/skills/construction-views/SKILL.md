---
name: construction-views
description: Use when creating construction/build documentation for woodworking or home improvement projects. Triggers on "construction view", "build diagram", "framing", "assembly instructions", or when visualizing how something gets built.
---

# Construction Views for Build Documentation

## Overview

Create comprehensive construction documentation with framing diagrams, cross-sections with callouts, connection details, and build sequences. **Always validate designs against real-world photos before finalizing.**

## Core Components

### 1. Framing Diagrams (2x2 Grid)
Show structural skeleton views:
- **Carcass/Box**: 3D-ish skeleton (sides, bottom, stretchers, dado locations)
- **Face Frame**: Rails, stiles, door openings, hinge positions
- **Attachment Method**: Brackets, screws, slotted holes for wood movement
- **Site Prep**: What exists, what needs modification

### 2. Cross-Section with Callouts
Side section showing:
- Material callout boxes pointing to each layer
- Dimension lines with measurements
- Interior details (shelves, cleats, supports)
- Relationship to existing structures

### 3. Connection Details
Zoomed detail views (3 panels) of critical joints:
- Fastener types and placement
- Clearances and tolerances
- Movement allowances (wood expansion)

### 4. Supporting Information
- **Materials Table**: Item, size, quantity, notes
- **Build Sequence**: Numbered steps in order
- **Key Dimensions**: 6-box summary grid
- **Considerations**: Warnings, code requirements, gotchas

## Reality-Check Protocol

**Before finalizing any construction view:**

1. **Compare with real-world photos** of the actual space
2. **Ask three questions:**

| Perspective | Key Question |
|-------------|--------------|
| **Interior Designer** | Does this match the existing finishes? Am I covering something that's already done? |
| **Architect** | What's structural vs cosmetic? What's already there that I can use? |
| **Contractor** | Am I solving a problem that doesn't exist? What's the simplest path? |

3. **Challenge assumptions** about what exists vs what needs to be built

### Example Reality-Check Failure
We designed a "step panel" to cover exposed framing - photos revealed a finished drywall half-wall already existed. The entire panel concept was unnecessary complexity.

## SVG Styling (Dark Theme)

```javascript
// Colors
background: '#0a0f18'
panel: '#1e293b'
stroke: '#334155'
text: '#e2e8f0'
accent: '#4ade80'  // green for headers
dimension: '#38bdf8' // cyan for measurements
callout: '#fbbf24'  // amber for callout lines

// Existing structures (drywall, etc)
existing: '#d4c5b0'  // cream/beige
wood: '#8b6914'      // wood cap/trim
```

## Workflow

1. **Reality-check FIRST**: View reference photos, identify existing structures
2. **Run professional perspectives**: Designer/Architect/Contractor questions
3. **Gather requirements**: Dimensions, materials, what's new vs existing
4. **Draft framing diagrams**: Structural skeleton (distinguish new from existing)
5. **Add cross-section**: With callout boxes and dimension lines
6. **Detail connections**: Zoomed views of critical joints
7. **Document materials/sequence**: Tables and numbered steps
8. **Test rendering**: Use Playwright for full-page screenshots
9. **Iterate**: Refine based on feedback

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Designing without photos | Always get/view reference photos first |
| **Assuming blank slate** | **CRITICAL**: Check what already exists (finished walls, trim, framing). Most home improvement builds on existing structures. |
| Over-engineering | Simplest solution that works; don't add unnecessary panels/structure |
| Missing dimension lines | Every callout needs associated measurements |
| Static materials list | Make tables dynamic based on config state |
