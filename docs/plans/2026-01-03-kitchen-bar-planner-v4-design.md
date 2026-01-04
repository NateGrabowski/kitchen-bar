# Kitchen Bar Planner v4 Design

## Overview

Combine the best of `kitchen-bar-planner-v3.jsx` (multi-view architecture, ergonomic feedback) with `hybrid-bar-options.jsx` (5 configuration presets, pros/cons guidance) into a single unified visualization.

## Goals

- Keep v3's intuitive multi-view interface (Side, Front, Plan, Construction)
- Add quick-set preset buttons for the 5 kitchen-floor cabinet configurations
- Show inline pros/cons when a preset is selected
- Allow manual override of any setting after selecting a preset

## UI Structure

### Layout (unchanged from v3)

- **Left panel (280px):** Controls
- **Right panel:** Diagrams with view tabs

### Left Panel - Top to Bottom

1. **Configuration Presets** (NEW)
   - Row of 5 buttons: `[Flush] [Setback] [Tiered] [Ledge] [Floating]`
   - Selected button highlighted blue
   - Below buttons: 1-line description + compact pros/cons

2. **Dimensions** (from v3)
   - Step Height, Bar Top Height, Total Depth, Cabinet Depth, Cabinet Setback
   - Bar Length, Stool Height, Top Thickness
   - Some sliders conditional based on active toggles

3. **Design Options** (enhanced from v3)
   - Cabinet style (Doors/Open/Mixed)
   - Tiered bar toggle (NEW) + Raised bar height slider
   - LR ledge toggle (NEW) + Ledge height/depth sliders
   - LR shelves toggle (NEW) + Shelf height slider
   - Waterfall edge, under-cabinet lighting, wine storage, pass-through
   - Show seated person

4. **Calculated Values** (from v3)
   - Bar from living room floor, Kitchen knee clearance, Living room overhang
   - Cabinet height, Seat to bar top, Seating capacity
   - Green/orange status indicators for ergonomics

### Right Panel

View tabs: `[All Views] [Side Section] [Front View] [Plan View] [Construction]`

Each view updates to show:
- Tiered bar section when enabled
- LR ledge when enabled
- LR floating shelves when enabled

## Configuration Presets

### Preset Values

| Preset | Setback | Tiered | Raised Height | LR Ledge | LR Shelves |
|--------|---------|--------|---------------|----------|------------|
| Flush | 0" | OFF | - | OFF | OFF |
| Setback | 4" | OFF | - | OFF | OFF |
| Tiered | 0" | ON | 6" | OFF | OFF |
| Ledge | 0" | OFF | - | ON (42"h, 10"d) | OFF |
| Floating | 0" | OFF | - | OFF | ON (42"h) |

### Values Preserved Across Presets

These don't change when switching presets:
- Step height (23.5")
- Bar length (84")
- Bar top height
- Stool height
- Cabinet depth (24")
- Design options (lighting, wine storage, etc.)

### Preset Info Content

Displayed inline below preset buttons:

**Flush:** Cabinets align with step edge
`✓ Simplest build · ✓ Standard cabinets · ⚠ No LR function · ⚠ Counter height only`

**Setback:** Step edge stays visible
`✓ Natural boundary · ✓ Easier step navigation · ⚠ May collect debris · ⚠ Counter height only`

**Tiered:** Counter + raised bar section
`✓ True bar height · ✓ Hides kitchen mess · ⚠ More complex · ⚠ Crumb gap`

**Ledge:** Add LR drink shelf
`✓ LR functionality · ✓ Standing-friendly · ⚠ Needs secure mounting · ⚠ Two separate elements`

**Floating:** Add LR display shelves
`✓ Display storage · ✓ Modern look · ⚠ Visible clutter · ⚠ Dust accumulation`

## New State Variables

Add to existing v3 config state:

```javascript
// New toggles
tieredBar: false,
raisedBarHeight: 6,      // inches above counter level

lrLedge: false,
ledgeHeight: 42,         // from LR floor
ledgeDepth: 10,

lrShelves: false,
shelfHeight: 42,         // from LR floor

// New: active preset tracking
activePreset: 'flush',   // 'flush' | 'setback' | 'tiered' | 'ledge' | 'floating' | null
```

## Diagram Updates Required

### Side Section View
- Render tiered bar top (two-level) when `tieredBar` is ON
- Render LR ledge mounted to step face when `lrLedge` is ON
- Render LR floating shelves when `lrShelves` is ON
- Add dimension lines for new elements

### Living Room View (Front Elevation)
- Show tiered bar as raised portion on living room side
- Show LR ledge as horizontal shelf across front
- Show LR floating shelves (1-2 shelves)

### Plan View (Bird's Eye)
- Show tiered section as labeled zone
- Show LR ledge as narrow strip on living room side

### Construction View
- Add ledge bracket mounting detail
- Add tiered bar support framing detail

## Baseline Values

From project brief:

```
Step height:           23.5"
Bar top height:        40" (from kitchen floor)
Total bar depth:       28"
Cabinet depth:         24" (standard base cabinet)
Cabinet setback:       0" (flush default)
Bar length:            84"
Stool height:          30"
Bar top thickness:     1.5"
Kitchen overhang:      12" (knee clearance)
```

## File Output

Create new file: `visualization/jsx/kitchen-bar-planner-v4.jsx`

Update `src/App.jsx` to include v4 in the visualization list.

## Implementation Order

1. Copy v3 as starting point
2. Add preset state and button UI
3. Add preset info display (inline pros/cons)
4. Add new toggles (tiered, ledge, shelves) to Design Options
5. Add conditional sliders for new toggles
6. Update Side Section view to render new elements
7. Update Living Room view
8. Update Plan view
9. Update Construction view
10. Wire up preset buttons to set values
11. Test all presets and manual overrides
12. Add to App.jsx dropdown
