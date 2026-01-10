# Wire Routing Diagram - Kitchen Bar

**Purpose:** Wire routing plan showing electrical pathways through cabinet
**Date:** 2026-01-09
**Agent:** WS7 Electrical

---

## Executive Summary

This document provides detailed wire routing diagrams for:
1. **120V AC circuit** (pop-up outlet)
2. **24V DC low-voltage** (LED lighting)
3. **Concealment methods**
4. **Access points for service**

---

## Overview Diagram - Top View

```
                               KITCHEN SIDE (seating)
                                        ↓
    ┌─────────────────────────────────────────────────────────────────────────────────────────┐
    │                                 BUTCHER BLOCK TOP                                        │
    │                                   (92" × 30")                                            │
    │                                                                                          │
    │           ●                                                                              │
    │       POP-UP                                                                             │
    │       OUTLET                                                                             │
    │      (15" from left,                                                                     │
    │       6" from kitchen edge)                                                              │
    │                                                                                          │
    │                                                                                          │
    └──────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                    ↓ 3" overhang
    ┌──────────────────────────────────────────────────────────────────────────────────────────┐
    │ ═════════════════════════════════════════════════════════════════════════════════════════│ ← LED Zone 1
    │                                     LIVING ROOM PANEL                                     │   (under overhang)
    │                                       (92" × 34.5")                                       │
    │                                                                                           │
    │  ┌────────────────────┐  ┌───────────────────────┐  ┌────────────────────────────────┐   │
    │  │                    │  │                       │  │                                │   │
    │  │    DRAWER 1        │  │     BARN DOOR         │  │      DOUBLE DOOR               │   │
    │  │                    │  │      OPENING          │  │                                │   │
    │  │  ┌──────────────┐  │  │   ═══════════════ LED │  │                                │   │
    │  │  │ J-BOX        │  │  │   (internal Zone 2)   │  │                                │   │
    │  │  │ [24V PS]     │  │  │                       │  │                                │   │
    │  │  │              │  │  │   ═══════════════ LED │  │                                │   │
    │  │  └──────────────┘  │  │   (internal Zone 2)   │  │                                │   │
    │  │    DRAWER 2        │  │                       │  │                                │   │
    │  │                    │  │   ○ MOTION SENSOR     │  │                                │   │
    │  │                    │  │                       │  │                                │   │
    │  │    DRAWER 3        │  │                       │  │                                │   │
    │  │                    │  │                       │  │                                │   │
    │  └────────────────────┘  └───────────────────────┘  └────────────────────────────────┘   │
    │        0-30"                     30-60"                        60-92"                     │
    └──────────────────────────────────────────────────────────────────────────────────────────┘
                                                ↑
                                      LIVING ROOM SIDE
```

---

## Power Entry Point

### Primary Entry Location

Power enters the cabinet through the **left side** near the wall. The kitchen side of the bar likely has access to existing electrical (behind current railing location).

```
Side View (Left End):

    WALL                          ← Existing kitchen outlet or junction box
      │
      │     ┌─────────────────────────────────────
      │     │         BUTCHER BLOCK TOP
    ──┼─────┴─────────────────────────────────────
      │
      │     ┌─────────────────────────────────────
      │     │
    ──┴─→   │         CABINET INTERIOR            ← 120V Romex enters here
  POWER     │                                        (through cabinet side)
  ENTRY     │         [ J-BOX ]
      │     │
      │     │
      │     │
      │     ├─────────────────────────────────────
      │     │         TOE KICK
      │     │
    ──┴─────┴─────────────────────────────────────
         FLOOR
```

### Entry Hole Specification

| Parameter | Value |
|-----------|-------|
| Hole Size | 1" diameter |
| Location | Left cabinet side, 6" from bottom |
| Protection | Grommet or NM cable connector |
| Cable Type | 12/2 NM-B (Romex) |

---

## 120V AC Routing (Pop-Up Outlet)

### Route from Entry to Outlet

```
Front View (looking from living room):

                                 ● POP-UP OUTLET
                                 │ (in countertop)
    ┌────────────────────────────│────────────────────────────────────────────────────────────┐
    │                            ↓                                                             │
    │   ═════════════════════════════════════════════════════════════════════════════ LED Z1  │
    │                                                                                          │
    │  ┌────────────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐   │
    │  │                            │  │                       │  │                       │   │
    │  │  ╔═══════════╗             │  │      BARN DOOR        │  │     DOUBLE DOOR       │   │
    │  │  ║ JUNCTION  ║──→ up to ───┼──→     OPENING          │  │                       │   │
    │  │  ║   BOX     ║   pop-up    │  │                       │  │                       │   │
    │  │  ╚═════╦═════╝             │  │                       │  │                       │   │
    │  │        ║                   │  │                       │  │                       │   │
    │  │        ║ ← 120V in         │  │                       │  │                       │   │
    │  │        ║   (from wall)     │  │                       │  │                       │   │
    │  │        ║                   │  │                       │  │                       │   │
    │  └────────║───────────────────┘  └───────────────────────┘  └───────────────────────┘   │
    │           ║                                                                              │
    │           ║                                                                              │
    └───────────║──────────────────────────────────────────────────────────────────────────────┘
                ║
               ═╩═ POWER ENTRY (left side, through cabinet wall)
```

### Wire Path Detail

1. **Entry:** 12/2 Romex enters through 1" hole in left cabinet side
2. **Junction Box:** Metal 4x4 box mounted inside drawer cabinet (behind drawer 2)
3. **To Pop-Up:** 12/2 Romex runs up through countertop hole to pop-up outlet
4. **Pop-Up Connection:** Pop-up has 36" pigtails, splice in junction box

### Access for Service

- **Junction Box Location:** Behind middle drawer (Drawer 2)
- **Access Method:** Remove drawer to access junction box
- **Box Type:** Metal 4x4x2" junction box with blank cover

---

## 24V DC Routing (LED Lighting)

### Route from Power Supply to LED Zones

```
Front View (looking from living room):

    ┌─────────────────────────────────────────────────────────────────────────────────────────┐
    │   ═══════════════════════════════════════════════════════════════════════════ LED ZONE 1│
    │      ↑                    (under counter, living room side, 92")                         │
    │      │                                                                                   │
    │      │  ┌────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐    │
    │      │  │                    │  │  ════════════ LED 2-A │  │                       │    │
    │      │  │  ╔════════════╗    │  │                       │  │                       │    │
    │      │  │  ║  24V       ║────┼──→─────────────────────→─┼──┤                       │    │
    │      │  │  ║  POWER     ║    │  │  ════════════ LED 2-B │  │                       │    │
    │      │  │  ║  SUPPLY    ║    │  │                       │  │                       │    │
    │      └──│──║            ║    │  │     ○ MOTION          │  │                       │    │
    │         │  ║ (behind    ║    │  │       SENSOR          │  │                       │    │
    │         │  ║  drawer 3) ║    │  │                       │  │                       │    │
    │         │  ╚═════╦══════╝    │  │                       │  │                       │    │
    │         │        ║ ← 120V AC │  │                       │  │                       │    │
    │         └────────║───────────┘  └───────────────────────┘  └───────────────────────┘    │
    │                  ║                                                                       │
    └──────────────────║───────────────────────────────────────────────────────────────────────┘
                       ║
                      ═╩═ 120V from junction box
```

### LED Zone 1 (Under-Overhang) Routing

```
Top View - Zone 1:

    COUNTER EDGE (living room side)
    ↓
    ════════════════════════════════════════════════════════════════════════════════════
    │ LED STRIP IN ALUMINUM CHANNEL (92")                                               │
    │                                                                                   │
    │   ← 18AWG 2-conductor runs through cabinet side to power supply                  │
    │                                                                                   │
    ════════════════════════════════════════════════════════════════════════════════════
    ↑
    Wire exits through small hole (1/4") at left end, drops into cabinet
```

**Wire Path:**
1. LED strip starts at left end
2. 18AWG 2-conductor drops through 1/4" hole at left end
3. Wire runs through cabinet interior to power supply
4. Total run: ~4 feet

### LED Zone 2 (Inside Cabinet) Routing

```
Section 2 Detail - Barn Door Cabinet:

    ┌──────────────────────────────────────────────────────────────────┐
    │                          CABINET TOP                              │
    │                                                                   │
    │   ════════════════════════════════════════════════════ LED 2-A   │
    │              (under top, 28.5" long)                   │          │
    │                                                        │ 18AWG   │
    │                                                        ↓ drops   │
    ├──────────────────────────────────────────────────────────────────┤
    │                        SHELF 2 (upper)                           │
    ├──────────────────────────────────────────────────────────────────┤
    │                                                                   │
    │   ════════════════════════════════════════════════════ LED 2-B   │
    │              (under shelf 2, 28.5" long)               │          │
    │                                                        │ 18AWG   │
    │                                                        ↓ drops   │
    ├──────────────────────────────────────────────────────────────────┤
    │                        SHELF 1 (lower)                           │
    ├──────────────────────────────────────────────────────────────────┤
    │                                                                   │
    │                          ○ MOTION SENSOR                         │
    │                     (mounted on back panel)                       │
    │                                                                   │
    │             ─────────────────────────────→                       │
    │                      18AWG to power supply (through divider)     │
    │                                                                   │
    └──────────────────────────────────────────────────────────────────┘
                                       ↓
                              (wire runs through divider
                               to drawer section power supply)
```

**Wire Path:**
1. LED 2-A mounted under top, wire drops at right side
2. LED 2-B mounted under shelf 2, wire drops at right side
3. Motion sensor mounted on back panel, near bottom
4. All wires route through hole in divider wall between Section 1 and 2
5. Connect to power supply in drawer section
6. Total run: ~6-8 feet

---

## Wire Hole Locations

### Summary of Required Holes

| Hole # | Location | Size | Purpose |
|--------|----------|------|---------|
| H1 | Left cabinet side, 6" up | 1" | 120V Romex entry |
| H2 | Left cabinet side, 4" up | 1/2" | 18AWG LED wire entry (Zone 1) |
| H3 | Countertop over drawer section | 3.75" dia | Pop-up outlet cutout |
| H4 | Cabinet top at left, near edge | 1/4" | Zone 1 LED wire pass-through |
| H5 | Divider between Section 1 & 2, 6" up | 3/4" | Zone 2 LED wires |
| H6 | Section 2 right side panel, near shelves | 1/4" × 2 | LED strip wire drops |

### Drill Before Assembly

**Pre-drill these holes BEFORE cabinet assembly:**
- H1 (left side, 120V entry)
- H2 (left side, LED entry)
- H5 (divider, Section 1 to 2)

**Drill during/after assembly:**
- H3 (countertop - after positioning)
- H4 (cabinet top - after LED placement)
- H6 (shelf area - after LED placement)

---

## Concealment Methods

### 120V Wiring

| Segment | Concealment Method |
|---------|-------------------|
| Wall to cabinet entry | In-wall Romex (existing or new) |
| Cabinet interior | Wiremold channel on cabinet back |
| To junction box | Bare Romex inside cabinet (legal in cabinet void) |
| To pop-up outlet | Romex through drilled path in countertop support |

### Low-Voltage LED Wiring

| Segment | Concealment Method |
|---------|-------------------|
| Power supply area | Behind drawer 3 (hidden by drawer) |
| To Zone 1 | Through 1/4" hole, into aluminum channel raceway |
| Zone 1 strip | Inside aluminum channel with diffuser |
| To Zone 2 | Through hole in divider, routed along back panel |
| Zone 2 strips | Inside short aluminum channels |
| Between Zone 2 strips | Adhesive wire clips on back panel |

### Wire Management Products

| Product | Use | Price |
|---------|-----|-------|
| Wiremold CordMate II | Conceals 120V runs inside cabinet | $8/6ft |
| Adhesive wire clips | Secures 18AWG LED wires | $5/pack |
| Spiral wire wrap | Bundles multiple low-voltage wires | $6/25ft |
| Grommets (1/4" and 1") | Clean pass-through holes | $4/pack |

---

## Power Supply Location

### Best Location: Behind Bottom Drawer (Drawer 3)

```
Side View - Drawer Section:

    ┌─────────────────────────────────────────┐
    │            DRAWER 1                      │
    ├─────────────────────────────────────────┤
    │            DRAWER 2                      │
    │         ╔════════════╗                   │
    │         ║  J-BOX     ║ ← 120V junction  │
    │         ╚════════════╝                   │
    ├─────────────────────────────────────────┤
    │            DRAWER 3                      │
    │                                          │
    │         ╔════════════╗                   │
    │         ║  24V PS    ║ ← Power supply   │
    │         ╚════════════╝     (6.5" × 2.5")│
    │                                          │
    └─────────────────────────────────────────┘
              TOE KICK
```

**Access:** Remove Drawer 3 to access power supply

**Why This Location:**
- Accessible for service
- Hidden behind drawer
- Short runs to both LED zones
- Away from heat/moisture
- Ventilated by drawer movement

---

## Cable Schedule

| Cable ID | Type | Gauge | Length | From | To |
|----------|------|-------|--------|------|-----|
| AC-1 | 12/2 NM-B Romex | 12 AWG | 6 ft | Wall box | Cabinet J-box |
| AC-2 | 12/2 NM-B Romex | 12 AWG | 4 ft | J-box | Pop-up outlet |
| LV-1 | 18/2 CL2 | 18 AWG | 2 ft | J-box | Power supply |
| LV-2 | 18/2 CL2 | 18 AWG | 4 ft | PS | Zone 1 LED |
| LV-3 | 18/2 CL2 | 18 AWG | 8 ft | PS | Zone 2 LEDs + motion |
| LED-1 | LED strip wire | 20 AWG | 1 ft | LED 2-A | LED 2-B |

**Total Wire Needed:**
- 12/2 Romex: 15 feet (includes extra)
- 18/2 CL2 Low-Voltage: 25 feet (includes extra)

---

## Installation Sequence

### Phase 1: Pre-Assembly (Before Building Cabinets)

1. [ ] Drill hole H1 in left side panel (1" for 120V)
2. [ ] Drill hole H2 in left side panel (1/2" for LED wire)
3. [ ] Drill hole H5 in divider panel (3/4" for Zone 2)
4. [ ] Install grommets in all drilled holes
5. [ ] Mount aluminum LED channels to underside of cabinet top and shelf 2

### Phase 2: During Cabinet Assembly

1. [ ] Install junction box inside drawer section (behind Drawer 2 area)
2. [ ] Rough-in wire clips along back panel route
3. [ ] Test-fit power supply location behind Drawer 3

### Phase 3: After Cabinet Installation

1. [ ] Run 120V Romex from source to junction box (AC-1)
2. [ ] Run 120V Romex from junction box up to pop-up location (AC-2)
3. [ ] Cut countertop hole (H3) for pop-up outlet
4. [ ] Install and wire pop-up outlet
5. [ ] Connect power supply to 120V (LV-1)
6. [ ] Run low-voltage wire to Zone 1 (LV-2)
7. [ ] Run low-voltage wire to Zone 2 (LV-3)
8. [ ] Install LED strips in channels
9. [ ] Connect LED strips to wires
10. [ ] Install motion sensor
11. [ ] Test all circuits
12. [ ] Install wire concealment (clips, covers)

### Phase 4: Final

1. [ ] Re-install drawers
2. [ ] Test pop-up outlet (GFCI test button)
3. [ ] Test LED dimmer
4. [ ] Test motion sensor activation
5. [ ] Verify no visible wires

---

## Testing Procedure

### 120V Circuit

1. Verify GFCI test/reset buttons work on pop-up outlet
2. Verify both outlets provide power
3. Test USB-A port with phone charger
4. Test USB-C port with device
5. Verify pop-up mechanism opens/closes smoothly

### LED Lighting

1. Turn on Zone 1 - verify full strip illuminates
2. Test dimmer function (if installed)
3. Open barn door area - verify motion sensor activates Zone 2
4. Wait for timeout - verify Zone 2 turns off
5. Check for any flickering or dim spots
6. Verify no LED dots visible through diffuser

---

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Pop-up GFCI trips immediately | Ground fault in wiring | Check connections for bare wire contact |
| LED strip partial failure | Cut at wrong location | Replace section, cut at marked points only |
| Motion sensor always on | Sensitivity too high | Adjust potentiometer on sensor |
| LED dim at far end | Voltage drop | Use 24V (not 12V), check connections |
| Flickering LEDs | Loose connection | Re-secure all connectors |

---

*Document created: 2026-01-09*
*Agent: WS7 Electrical*
