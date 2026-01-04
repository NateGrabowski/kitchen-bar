---
name: construction-views
description: Use when creating or validating construction documentation for woodworking/home improvement. Triggers on "construction view", "build diagram", "framing", or when asked to review/create build documentation.
---

# Construction Views Workflow

## Overview

**Create construction documentation that accurately represents the ACTUAL design.** Never copy patterns blindly - understand the design first, build documentation that matches, then verify the output.

## Workflow

```
START
  ↓
1. UNDERSTAND THE DESIGN
   Read Side Section, Front View, config
   What is actually being built?
  ↓
2. REALITY-CHECK (photos)
   What exists? What's new?
  ↓
Does construction view exist?
  ↓ YES                    ↓ NO
  VALIDATE                 CREATE
  ↓                        ↓
Check components           Build components
  ↓                        ↓
Report issues              Show result
  ↓
Offer to update?
  ↓
3. CREATE/UPDATE construction view
   Diagrams must match the design
  ↓
4. POST-COMPLETION REVIEW ← CRITICAL
   Run 3 perspectives on YOUR OUTPUT
   Does it match the design?
  ↓
   If issues → Fix → Review again
  ↓
DONE
```

## Step 1: UNDERSTAND THE DESIGN (Do This First!)

**Before touching construction view, answer:**
- What type of structure is this? (cabinet on floor? continuous structure? built-in?)
- Where does it attach? (floor? wall? existing structure?)
- What are the key dimensions and how do they relate?
- Read the Side Section view - this IS the design

**Different designs need different construction approaches:**

| Design Type | Construction Approach |
|-------------|----------------------|
| Cabinet on floor | Standard cabinet carcass, sits on subfloor |
| Continuous structure | Full-height framing, anchored at multiple points |
| Built-in modification | Works with existing structure |

## Step 2: Reality-Check Protocol (ALWAYS RUN)

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

## Step 3: Create/Update Construction View

### Required Components (adapt to YOUR design)

**1. FRAMING DIAGRAMS** (2x2 grid)
```jsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
  {/* Component 1: Structure type (cabinet carcass, full-height frame, etc.) */}
  {/* Component 2: Face frame OR panel layout */}
  {/* Component 3: Counter attachment method */}
  {/* Component 4: Site prep / existing wall integration */}
</div>
```

**2. CROSS-SECTION WITH CALLOUTS**
- Full side section matching the design's Side Section view
- Callout boxes with leader lines pointing to each component
- Callouts include: name, dimensions, material
- Dimension lines for key measurements
- Show EXISTING structures in cream `#d4c5b0`

**3. CONNECTION DETAILS** (3-column grid)
- Zoomed views of critical joints
- Counter-to-structure attachment (L-brackets, slotted holes)
- Structure-to-floor/wall attachment
- Overhang support (if applicable)

**4. MATERIALS TABLE**
- Item, Size, Qty, Notes columns
- Dynamic values from config
- Flag non-standard sizes

**5. BUILD SEQUENCE**
- Numbered steps in logical order
- Reference existing structures first
- Assembly order that makes physical sense

**6. KEY DIMENSIONS** (grid)
- 6 most important measurements
- Show notes (e.g., "CUSTOM", "ideal", "check")

**7. CONSIDERATIONS**
- Warnings about non-standard dimensions
- Requirements for structural support
- Material-specific notes

**CRITICAL: Every diagram must represent the ACTUAL design, not a generic pattern.**

## Step 4: POST-COMPLETION REVIEW (Run This!)

**After creating/updating, run three perspectives on YOUR OUTPUT:**

| Perspective | Question |
|-------------|----------|
| **Interior Designer** | Does this construction view match the design aesthetic? |
| **Architect** | Does the cross-section match the Side Section view? Are the structural connections correct for this design? |
| **Contractor** | Can I actually build this? Does it make physical sense? |

**Physical reality checks (CRITICAL):**
- [ ] Structure actually touches the ground (no floating frames)
- [ ] Where do people sit/stand? Nothing poking into that space
- [ ] Brackets/supports are hidden or positioned logically
- [ ] A human could actually use this without injury

**Consistency checks:**
- [ ] Cross-section matches Side Section view
- [ ] Framing diagrams show correct structure type
- [ ] Dimensions in construction view match config values
- [ ] Materials list is appropriate for THIS design

**If ANY check fails → Fix and review again**

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

**Do NOT copy it directly for other design types** - adapt the patterns to match the actual design.

## Critical Mistakes

| Mistake | Why It Happens | Fix |
|---------|----------------|-----|
| **Assuming blank slate** | Didn't check photos for existing structures | Reality-check catches this - most builds work WITH existing |
| **Copying patterns blindly** | Reference impl looks good, just use it | UNDERSTAND design first, adapt patterns |
| **Cross-section doesn't match Side Section** | Didn't read the actual design views | Compare output against Side Section |
| **Skipping post-completion review** | "Looks done, ship it" | ALWAYS run 3 perspectives on output |
| **Wrong structure type** | Didn't identify design type | Step 1: What type of structure is this? |
| **Physical impossibilities** | Floating frames, brackets in leg space | Physical reality checks catch these |
