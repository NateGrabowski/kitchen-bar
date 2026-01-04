---
name: construction-views
description: Use when creating or validating construction documentation for woodworking/home improvement. Triggers on "construction view", "build diagram", "framing", or when asked to review/create build documentation.
---

# Construction Views Workflow

## Overview

**This skill validates existing construction views or creates new ones.** Always runs the Reality-Check Protocol against reference photos first.

## Workflow

```
START
  ↓
Does construction view exist?
  ↓ YES                    ↓ NO
  VALIDATE                 CREATE
  ↓                        ↓
Reality-Check Protocol     Reality-Check Protocol
  ↓                        ↓
Give feedback              Build components
  ↓                        ↓
Offer to update?           Show result
  ↓ YES
  Make changes
```

## Reality-Check Protocol (ALWAYS RUN FIRST)

1. **Find and view reference photos** in `docs/images/` or ask user for photos
2. **Identify existing structures** - walls, finishes, framing already in place
3. **Run three perspectives:**

| Perspective | Question |
|-------------|----------|
| **Interior Designer** | What's already finished that we shouldn't cover? |
| **Architect** | What's structural vs cosmetic? What can we reuse? |
| **Contractor** | Am I solving a problem that doesn't exist? Simplest path? |

4. **Report findings** before any design work

## VALIDATE Flow (existing view)

1. Read the construction view code
2. Run Reality-Check Protocol against photos
3. Check for these components:
   - [ ] Framing diagrams (ideally 2x2 grid)
   - [ ] Cross-section with material callouts
   - [ ] Connection details (zoomed joints)
   - [ ] Materials table (dynamic)
   - [ ] Build sequence (numbered steps)
   - [ ] Key dimensions summary
   - [ ] Warnings/considerations

4. **Report what's missing or incorrect**
5. Ask: "Want me to update the construction view?"

## CREATE Flow (empty/new view)

Build these components in order:

### 1. Framing Diagrams (2x2 grid)
```jsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
  {/* Cabinet Carcass */}
  {/* Face Frame */}
  {/* Counter Attachment */}
  {/* Site Prep / Existing Wall Prep */}
</div>
```

### 2. Cross-Section with Callouts
- Side view showing all layers
- Callout boxes with leader lines pointing to materials
- Dimension lines (cyan `#38bdf8`)
- Show EXISTING structures in cream `#d4c5b0`

### 3. Connection Details (3 panels)
Zoomed views of critical joints:
- Counter attachment (L-brackets, slotted holes)
- Cabinet positioning (relationship to existing structures)
- Overhang support (if applicable)

### 4. Supporting Info
- Materials table: Item | Size | Qty | Notes
- Build sequence: Numbered steps
- Key dimensions: 6-box summary grid
- Considerations: Warnings, code requirements

## Color Scheme (Dark Theme)

```javascript
background: '#0a0f18'
panel: '#1e293b'
accent: '#4ade80'      // headers
dimension: '#38bdf8'   // measurements
callout: '#fbbf24'     // leader lines
existing: '#d4c5b0'    // existing structures
wood: '#8b6914'        // trim/caps
```

## Reference Implementation

See `visualization/jsx/kitchen-floor-cabinets-sketch.jsx` Construction tab for complete working example with:
- 4-panel framing diagram grid
- Cross-section with callout boxes
- 3-panel connection details
- Dynamic materials table
- 10-step build sequence

## Critical Mistake to Avoid

**Assuming blank slate**: Most home improvement builds ON existing structures. The v4 construction view assumed new framing was needed, but photos revealed a finished drywall half-wall already existed. Reality-check catches this.
