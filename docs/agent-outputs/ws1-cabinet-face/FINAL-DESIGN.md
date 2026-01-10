# Cabinet Face Final Design

**Status:** APPROVED BY HUMAN
**Date:** 2026-01-09 (Session 2)
**Visualization:** `visualization/jsx/cabinet-face-final.jsx`

---

## Executive Summary

Human has specified the final cabinet face layout. This design supersedes all Session 1 options (A, B, C).

## Final Layout

```
┌─────────────┬─────────────┬──────────────┐
│   DRAWERS   │  BARN DOOR  │ DOUBLE DOOR  │
│    (30")    │   (30")     │    (32")     │
│             │             │              │
│  ┌───────┐  │  ╲       ╱  │  ┌────┬────┐ │
│  │       │  │   ╲     ╱   │  │    │    │ │
│  ├───────┤  │    ╲   ╱    │  │    │    │ │
│  │       │  │     ╲ ╱     │  │    │    │ │
│  ├───────┤  │     ╱ ╲     │  │    │    │ │
│  │       │  │    ╱   ╲    │  │    │    │ │
│  └───────┘  │   ╱     ╲   │  └────┴────┘ │
│             │  ╱       ╲  │              │
└─────────────┴─────────────┴──────────────┘
        ← barn door slides left
```

---

## Locked Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Total Width** | 92" | Locked |
| **Cabinet Height** | 34.5" | Standard base cabinet |
| **Toe Kick** | 4" | Recessed |
| **Cabinet Depth** | 14" | Doors face living room |
| **Butcher Block** | 1.5" | Chevron pattern |

## Section Breakdown

| Section | Width | Description |
|---------|-------|-------------|
| Drawers | 30" | Triple drawer bank, shaker fronts, bar pulls |
| Barn Door Opening | 30" | Open shelving with 30" sliding X-panel door |
| Double Door | 32" | Split shaker doors (~16" each) |
| **Total** | **92"** | |

---

## Design Features

### Section 1: Triple Drawer Bank (30")

- **Drawer count:** 3 equal-height drawers
- **Style:** Shaker fronts with inset detail
- **Hardware:** 5-6" bar pulls, horizontal, centered
- **Slides:** Full-extension soft-close
- **Construction:** Pocket hole joinery

### Section 2: Barn Door Opening (30")

- **Opening:** 30" wide cabinet box with 2 internal shelves
- **Shelf positions:** 1/3 and 2/3 height
- **LED lighting:** Under-shelf strips (toggleable in visualization)

#### The Barn Door

- **Door width:** 30" (fully covers opening when closed)
- **Slide direction:** Left, over drawer section
- **Track length:** ~60" (spans drawer section + opening)
- **Door style:** X-panel (farmhouse aesthetic)
- **Hardware:** Soft-stop barn door kit recommended
- **Handle:** Vertical bar pull on right edge

### Section 3: Double Door (32")

- **Door configuration:** Two doors, ~15.5" each (accounting for gap)
- **Style:** Shaker with inset detail
- **Hardware:** Vertical handles on meeting edges
- **Hinges:** Soft-close concealed hinges

### Optional Features (Toggle in Visualization)

- **X-Frame End Panels:** Decorative wood X-pattern on both cabinet ends
- **LED Lighting:** Under-shelf strips in barn door opening
- **Color options:** Navy (recommended), charcoal, white, sage, natural

---

## Color Recommendation

Based on reference images and modern farmhouse aesthetic:

**Primary:** Navy or charcoal cabinet body
**Accent:** Warm wood tones (X-frame ends, barn door X-pattern, internal shelves)
**Butcher block:** Natural chevron acacia (Lowe's selection)

This creates contrast between painted cabinet and natural wood elements.

---

## Construction Implications

### New Requirements vs Session 1

| Component | Session 1 Options | Final Design | Change Impact |
|-----------|-------------------|--------------|---------------|
| Drawers | 0-3 small drawers | 3 full-width drawers | Need drawer box construction |
| Barn door | None | 30" X-panel sliding door | Need barn door hardware + track |
| Track system | None | 60" barn door track | Specialized hardware |
| End panels | Plain | X-frame option | Decorative woodworking |
| Cabinet sections | 3 equal or varied | 30/30/32 specific | Different box sizes |

### WS3 Updates Required

The construction techniques work stream must address:

1. **Drawer box construction** - Not covered in original WS3
2. **Barn door fabrication** - X-panel construction
3. **Track installation** - Mounting, leveling, alignment
4. **X-frame panels** - Decorative joinery if enabled

### WS4 Implications (Cut Lists)

Cut lists will need to account for:
- 3 drawer boxes with fronts
- Barn door frame and X-members
- Optional X-frame end panels
- Different cabinet box widths (30", 30", 32")

---

## Visualization Access

### Interactive View

```bash
cd C:\workspace\kitchen-bar
npm run dev
```

Open http://localhost:5173 and navigate to Cabinet Face Final

### Features

- Toggle barn door open/closed
- Toggle X-frame end panels
- Toggle LED lighting
- Toggle dimension display
- Switch color schemes (navy, charcoal, white, sage, natural)

---

## Gate 1 Status

**This design is ready for Gate 1 clearance.**

Human has specified exact layout. Visualization exists and matches spec.

### Checklist

- [x] Total width = 92" (30 + 30 + 32) ✓
- [x] Respects locked dimensions (34.5" height, 4" toe kick, 14" depth)
- [x] Modern farmhouse aesthetic (X-panels, shaker style, mixed materials)
- [x] Functional storage (drawers, shelves, closed cabinets)
- [x] Buildable with pocket hole construction
- [x] Interactive visualization created

---

## Historical Note

Session 1 generated three options:
- **Option A:** Classic symmetry (4 doors + 3 drawers)
- **Option B:** Open shelving mix (open top + 3 doors) - Was recommended
- **Option C:** Functional asymmetry (varied door widths + 2 drawers)

**Human rejected all three** and provided this custom specification with barn door feature not present in any Session 1 option.

Previous files preserved for reference:
- `option-A.jsx`, `option-B.jsx`, `option-C.jsx`
- `comparison.jsx`
- `RECOMMENDATION.md` (Session 1 recommendation - superseded)

---

*Document created: Session 2 (2026-01-09)*
*Design source: Human specification in docs/human-notes.md*
