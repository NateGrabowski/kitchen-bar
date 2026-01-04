# Kitchen Bar Design Spec

**Status:** Baseline established
**Last updated:** January 2026

---

## Design Summary

A split-level kitchen bar replacing the existing metal railing. Seating on the kitchen side faces the living room. Single continuous cabinet structure extends from bar top down to living room floor, maximizing storage.

---

## Fixed Constraints

| Parameter | Value | Notes |
|-----------|-------|-------|
| Step height | 23.5" | Living room floor to kitchen floor (architectural, cannot change) |
| Bar length | 84" | Fits existing railing span (~7 ft) |
| Seating side | Kitchen | People sit in kitchen, face living room |

---

## Baseline Dimensions

| Parameter | Value | Range | Notes |
|-----------|-------|-------|-------|
| Bar top height | 40" | 36-42" | From kitchen floor |
| Total depth | 28" | 25-32" | Front to back |
| Cabinet depth | 12" | 12-24" | Portion with storage |
| Knee space | 16" | 12-20" | Overhang for seating (total depth - cabinet depth) |
| Bar top thickness | 1.5" | 1.5-2" | Butcher block minimum for this span |
| Stool height | 30" | 28-32" | For 40" bar height |

---

## Calculated Values

| Metric | Calculation | Result |
|--------|-------------|--------|
| Bar from LR floor | step (23.5") + bar top (40") | 63.5" |
| Cabinet height | bar from LR floor - 4" | ~59.5" |
| Seating capacity | bar length (84") / 24" per seat | ~3 people |
| Seat-to-bar distance | bar top (40") - stool (30") | 10" |

---

## Configuration Options

### Flush (Default)
Single-level counter aligned with step edge.

- **Pros:** Simplest build, standard construction, clean look
- **Cons:** Counter height only (40" from kitchen floor)

### Tiered
Counter + raised bar section (adds 6") facing living room.

- **Pros:** True bar height (46"+), hides kitchen mess from LR view
- **Cons:** More complex build, crumb gap between levels

---

## Cabinet Structure

The cabinet is a **single continuous unit** from bar top to living room floor:

```
┌─────────────────────┐  ← Bar top (butcher block)
│                     │
│   UPPER CABINET     │  ← Kitchen-accessible storage
│   (kitchen floor    │
│    to bar top)      │
├─────────────────────┤  ← Kitchen floor level
│                     │
│   LOWER CABINET     │  ← Living room-accessible storage
│   (LR floor to      │     (in the step area)
│    kitchen floor)   │
│                     │
└─────────────────────┘  ← Living room floor
```

**No toe kick or visual break** - seamless cabinet face from top to bottom.

---

## Materials

| Component | Material | Notes |
|-----------|----------|-------|
| Bar top | Butcher block | 1.5"+ thickness, food-safe finish |
| Cabinet boxes | Plywood | Build or buy separately |
| Cabinet face | TBD | Match honey oak or contrast |
| Framing | 2x4 studs | 16" O.C. |
| LR-side sheathing | 3/4" plywood | Finished panel |

---

## Features

### Included
- Under-cabinet LED lighting
- Electrical outlets (2-3 along bar top)
- Mixed cabinet style (open shelves + doors)

### Optional
- Tiered bar section (+6" raised portion)
- Waterfall edge (butcher block wraps sides)
- Pass-through opening (service window to LR)
- Wine storage section

---

## Ergonomics Reference

| Measurement | Ideal | Acceptable |
|-------------|-------|------------|
| Seat-to-bar top | 10-12" | 10-14" |
| Knee clearance depth | 12"+ | 10" min |
| Seating width per person | 24" | 22-26" |
| Bar height (from seated floor) | 40-42" | 36-44" |
| Counter height | 36" | 34-38" |

---

## Visualization Tool

**File:** `visualization/jsx/kitchen-bar-planner-v4.jsx`
**Loads as:** "kitchen-bar-planner" in the dropdown

Run with:
```bash
npm run dev
```

Opens at http://localhost:5173

---

## Open Decisions

1. **Cabinet finish** - Match honey oak cabinets or contrast (darker)?
2. **Support column** - Remove or incorporate into design?
3. **Tiered vs flush** - Worth the added complexity?
4. **Cabinet door direction** - Kitchen-facing, LR-facing, or both?
