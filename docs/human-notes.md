# Human Notes

Drop notes here from store visits, measurements, decisions, or anything you learn outside of orchestrator sessions. The orchestrator will incorporate these into the relevant work streams.

---

## How to Use This File

Just add dated entries with whatever info you have:

```
## 2026-01-XX: [Topic]
Decision: [REMOVABLE / MUST STAY / UNCERTAIN]
Notes: [What you observed]
(Optional) Add notes about your idea images if you want specific elements incorporated
```

Examples:

- Store pricing you discovered
- Measurements you took
- Decisions you made
- Questions that came up
- Things you saw that you liked/disliked

---

## Notes

*Add your notes below this line*

---

## 2026-01-09: Gate 0 - Column Assessment

Decision: UNCERTAIN
Notes:
The column stud doesn't go into the soffet. I think we might be okay but I'm going to get a second opinion from my contractor friend. Semi-blocked so far.

## 2026-01-09: Reference Photos

- Renamed the jpg images in `public\notes` to clearly state `[#]-reference-photo.jpg`
- Reminder: These are used for structural analysis only. I don't want design decisions or recommendations based on how the kitchen looks now.

## 2026-01-09: WS1 - **NEW PATH FORWARD**

### Layout Overview

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

### Specifications

| Parameter | Value |
|-----------|-------|
| **Total Width** | 92" |
| **Cabinet Height** | 34.5" |
| **Toe Kick** | 4" |
| **Cabinet Depth** | 14" |
| **Butcher Block** | 1.5" chevron pattern |

### Section Breakdown

| Section | Width | Description |
|---------|-------|-------------|
| Drawers | 30" | Triple drawer bank, shaker fronts, bar pulls |
| Barn Door Opening | 30" | Open shelving with 30" sliding X-panel door |
| Double Door | 32" | Split shaker doors (~16" each) |

---

### Barn Door Details

- **Door Width:** 30" (fully covers the opening)
- **Slide Direction:** Left, over the drawer section
- **Track Length Required:** ~60" (spans drawer + opening)
- **Door Style:** X-panel (farmhouse)
- **Hardware:** Soft-stop barn door kit recommended

When open, the barn door slides completely over the drawer section, exposing the full 30" opening with internal shelves.

---

### Design Features

- **X-Frame End Panels** — Decorative wood X-pattern on both ends (optional toggle)
- **LED Lighting** — Under-shelf strips in barn door opening
- **Shaker Style** — Consistent inset detail on drawers and double doors
- **Bar Pulls** — Horizontal pulls on drawers, vertical on doors
- **Toe Kick** — 4" recessed base for furniture-like appearance

---

### Color Recommendation

Based on reference images, **navy** or **charcoal** cabinet color with warm wood accents (X-frame ends, barn door X-pattern) creates the modern farmhouse look while complementing the existing warm oak kitchen cabinets.

---

### Construction Notes

#### Drawers (30")

- 3 equal-height drawers
- Full-extension soft-close slides
- Shaker front with inset detail
- 56" bar pulls, centered

#### Barn Door Section (30")

- Cabinet box with 2 internal shelves (at 1/3 and 2/3 height)
- Track mounted above, extending 30" past opening (over drawers)
- X-panel door with vertical handle on right edge

#### Double Doors (32")

- Two ~15.5" doors (accounting for center gap)
- Shaker style, overlay or inset
- Vertical handles on meeting edges
- Soft-close hinges

---

### Files

- `cabinet-face-final.jsx` — Interactive visualization with barn door open/close toggle

## 2026-01-09: WS2 - Butcher Block Decisions

Decision: Go with 2x `Lowe's Allen+Roth Chevron Acacia 72"x39"x1.5"`. The 1.5" is fine and we can join them to fit our proper size.

## 2026-01-09: WS3 - BLOCKED

- Decisions: BLOCKED/NEEDS REFIRE
 	- Due to the decisions made in `2026-01-09: WS1 - **NEW PATH FORWARD**` parts of this may need to be redone.

### Notes

- Tool — We do not have a table saw. Maybe we can get some things ripped at big box store or use a circular saw with track or something similar.  
- Slightly concerned that this is information, combined with the rest of the wsX files, will not come together properly to build what we need in ws8. 

## 2026-01-09: Issue with Session 1
Issue: Background Agents Failed to Write Output
- The parallel agents completed their work but didn't persist any files. This is a limitation with background agent file writes on Windows.
- Original background agents completed but didn't write files (a known Windows limitation). We recovered by re-running them as foreground tasks, which successfully created all 20 output files.

## 2026-01-09: Session 2
- **Gate 1** — CLEAR. Design looks good.
- **Gate 3** — Looks good. I'm okay with the hybrid approach.
- Overall I'm happier with WS3 after the refire. I do think that WS8 will probably need Opus to stitch everything together well. Also I'm concerned that there may be new revelations in WS4-7 that could impact WS8. Perhaps we should make WS8 -> WS9 (Opus) and have the new WS8 (Opus) smartly prepare/compile/validate information and explore any new revelations or gaps that were found.

## 2026-01-09: Improve Quality, Clarity of Outputs, Fail Faster, Fail Smarter
- Use Opus for all agents going forward.
  