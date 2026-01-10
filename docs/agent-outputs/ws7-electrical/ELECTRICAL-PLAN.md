# Electrical & Features Plan - Kitchen Bar Cabinet

**Work Stream:** WS7 Electrical
**Status:** COMPLETE
**Date:** 2026-01-09
**Agent:** WS7 Electrical

---

## Executive Summary

This plan covers electrical outlets, LED lighting, and foot rail for the kitchen bar cabinet. All recommendations are code-compliant and use specific products with SKUs.

### Feature Overview

| Feature | Type | Status |
|---------|------|--------|
| Countertop Outlet | Pop-up GFCI with USB-A/C | Planned |
| Under-Overhang LED | 92" warm white strip | Planned |
| Inside-Cabinet LED | 2 × 28" strips with motion sensor | Planned |
| Foot Rail | 2" matte black stainless, bar mount | Planned |

### Quick Links to Detail Documents

- [outlet-options.md](outlet-options.md) - Pop-up outlet research and recommendations
- [led-lighting.md](led-lighting.md) - LED strip specifications and products
- [foot-rail.md](foot-rail.md) - Foot rail design and installation
- [wire-routing.md](wire-routing.md) - Wire paths and installation sequence

---

## 1. Countertop Outlet

### Recommendation

**Lew Electric PUR20-BK-GFI-2USB-AC**

| Specification | Value |
|--------------|-------|
| Type | Pop-up, round |
| Outlets | 2 × 20A GFCI |
| USB-A | 1 port, 2.1A |
| USB-C | 1 port, 5V |
| Finish | Matte Black |
| Cutout | 3.75" diameter |
| Water Rating | IP54 (spill-proof) |
| Price | ~$295 |

### Placement

- **Position:** 15" from left edge, 6" from kitchen-side edge
- **Location:** Over drawer section (homework/laptop area)
- **Countertop Cutout:** 3.75" diameter hole in butcher block

### Code Compliance

- GFCI protection built into outlet (NEC 210.8)
- AFCI protection required at breaker (or AFCI/GFCI combo breaker)
- Kitchen island outlet must be IN countertop surface (2023 NEC)
- 20A circuit required

### Full Details

See [outlet-options.md](outlet-options.md)

---

## 2. LED Lighting

### Zone 1: Under-Overhang Strip

| Specification | Value |
|--------------|-------|
| Location | Under 3" counter overhang, living room side |
| Length | 92" (full cabinet width) |
| Color Temp | 3000K warm white |
| Brightness | ~350 lumens/foot (2,800 total) |
| Control | Manual dimmer |

**Product:** HitLights VITAL-3000K-24V-16.4FT + aluminum channel

### Zone 2: Inside-Cabinet Strips

| Specification | Value |
|--------------|-------|
| Location | Under cabinet top + under upper shelf (barn door section) |
| Length | 2 × 28" strips |
| Color Temp | 3000K warm white |
| Activation | Motion sensor (auto on/off) |

**Product:** Same LED strip (cut from Zone 1 roll) + HitLights PIR sensor

### Power System

| Component | Specification |
|-----------|--------------|
| Voltage | 24V DC |
| Power Supply | HitLights PS-24-96W-UL (96W capacity) |
| Total Load | 61W (both zones) |
| Wire | 18 AWG CL2-rated |

### Full Details

See [led-lighting.md](led-lighting.md)

---

## 3. Foot Rail

### Recommendation

**Top Hardware 8ft Matte Black Bar Mount Foot Rail Kit**

| Specification | Value |
|--------------|-------|
| Diameter | 2" OD |
| Material | 304 Stainless Steel |
| Finish | Matte Black powder coat |
| Length | 92" (cut from 96" tube) |
| Height | 6" from floor |
| Brackets | 3 × Bar mount |
| Price | ~$240 |

### Mounting

- Bar mount brackets (mount to toe kick face)
- Backing blocks required inside toe kick for strength
- Bracket spacing: 3", 46", 89" from left edge

### Full Details

See [foot-rail.md](foot-rail.md)

---

## 4. Code Compliance Summary

### Electrical (120V)

| Requirement | Status | Notes |
|-------------|--------|-------|
| GFCI Protection | Compliant | Built into pop-up outlet |
| AFCI Protection | Required | Install AFCI breaker or combo |
| 20A Circuit | Required | 12 AWG wire, 20A breaker |
| Kitchen Island Outlet Location | Compliant | Pop-up in countertop surface |
| Junction Box | Required | Inside drawer section cabinet |
| NEC 2023 406.5E | Compliant | Pop-up model is UL listed for countertop |

### Low Voltage (24V DC)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Class 2 Compliance | Compliant | Power supply under 96W |
| Wire Rating | Required | Use CL2-rated 18 AWG |
| In-Wall Wire | N/A | All wire inside cabinet void |
| Power Supply Access | Compliant | Behind removable drawer |

### Permits

| Situation | Permit Likely Required |
|-----------|----------------------|
| Tapping existing kitchen circuit | Usually no (if no new breaker) |
| Running new dedicated circuit | Often yes (varies by jurisdiction) |
| Low-voltage LED only | No |
| Foot rail (non-electrical) | No |

**Recommendation:** Check with local building department if running new circuit. Many jurisdictions allow homeowner electrical work with permit.

---

## 5. Wire Routing Overview

### Power Entry

Power enters through left cabinet side from existing kitchen circuit or new home run.

### Wire Paths

```
WALL → [12/2 Romex] → JUNCTION BOX (behind drawer 2)
                          │
                          ├── [12/2 Romex] → POP-UP OUTLET (in countertop)
                          │
                          └── [18/2 Low-V] → 24V POWER SUPPLY (behind drawer 3)
                                                  │
                                                  ├── [18/2] → LED ZONE 1 (under counter)
                                                  │
                                                  └── [18/2] → LED ZONE 2 (cabinet interior)
                                                               └── MOTION SENSOR
```

### Concealment

- All 120V wire inside cabinet void or countertop
- LED strips inside aluminum channels with diffuser
- Low-voltage wire secured with adhesive clips
- Power supply hidden behind bottom drawer

### Full Details

See [wire-routing.md](wire-routing.md)

---

## 6. Installation Sequence

### Phase 1: Before Cabinet Assembly

1. Drill wire entry holes in cabinet panels (see wire-routing.md)
2. Install grommets in all drilled holes
3. Mount aluminum LED channels to cabinet top underside

### Phase 2: During Cabinet Assembly

1. Install junction box inside drawer section
2. Install 2x4 backing blocks in toe kick for foot rail
3. Route placeholder wires if helpful

### Phase 3: After Cabinet Installation (Before Countertop)

1. Run 120V Romex from source to junction box
2. Mount 24V power supply behind Drawer 3 location
3. Connect power supply to 120V

### Phase 4: After Countertop Installation

1. Cut 3.75" hole in butcher block for pop-up outlet
2. Run 12/2 Romex up through countertop support to pop-up
3. Install and wire pop-up outlet
4. Connect LED strips to power supply
5. Install LED strips in channels
6. Install motion sensor in barn door section

### Phase 5: Finishing

1. Install foot rail (see foot-rail.md)
2. Test all electrical systems
3. Install wire concealment clips/covers
4. Final cleanup

---

## 7. Complete Shopping List

### Electrical - Pop-Up Outlet

| Item | SKU / Model | Qty | Price |
|------|-------------|-----|-------|
| Lew Electric Pop-Up GFCI + USB | PUR20-BK-GFI-2USB-AC | 1 | $295 |
| 12/2 NM-B Romex 25ft | - | 1 | $25 |
| Metal Junction Box 4x4x2 | - | 1 | $8 |
| NM Cable Connectors | - | 2 | $4 |
| Wire Connectors (yellow/red) | - | 1 pack | $5 |
| **Subtotal - Outlet** | | | **$337** |

### Electrical - LED Lighting

| Item | SKU / Model | Qty | Price |
|------|-------------|-----|-------|
| LED Strip 24V 3000K 16.4ft | HitLights VITAL-3000K-24V | 1 | $48 |
| Aluminum Channel 8ft | HitLights ADP-16-CH-AL | 1 | $22 |
| Aluminum Channel 3ft | HitLights ADP-16-CH-AL-3FT | 2 | $18 |
| End Caps | HitLights | 6 | $6 |
| 24V Power Supply 96W | HitLights PS-24-96W-UL | 1 | $35 |
| PIR Motion Sensor | HitLights SENS-PIR-120 | 1 | $12 |
| 18 AWG Low-V Wire 25ft | CL2 rated | 1 | $15 |
| Wire Connectors/Splitters | - | 1 pack | $8 |
| Inline Rotary Dimmer | 24V DC, 8A | 1 | $15 |
| Mounting Clips | adhesive | 1 pack | $5 |
| **Subtotal - LED** | | | **$184** |

### Foot Rail

| Item | SKU / Model | Qty | Price |
|------|-------------|-----|-------|
| Bar Mount Foot Rail Kit 8ft | Top Hardware 2" OD Matte Black | 1 | $240 |
| 2x4 Backing Blocks | from scrap | 3 | $6 |
| Wood Screws 3" | - | 12 | $5 |
| Pipe Cutter or Hacksaw | - | 1 | $20 |
| Deburring Tool | - | 1 | $8 |
| **Subtotal - Foot Rail** | | | **$279** |

### Miscellaneous

| Item | Description | Qty | Price |
|------|-------------|-----|-------|
| 3.75" Hole Saw | for countertop cutout | 1 | $25 |
| Grommets 1" | for wire pass-through | 4 | $4 |
| Grommets 1/4" | for LED wire | 4 | $3 |
| Wiremold CordMate 6ft | cable concealment | 1 | $8 |
| **Subtotal - Misc** | | | **$40** |

---

## 8. Cost Summary

| Category | Cost |
|----------|------|
| Pop-Up Outlet + Wiring | $337 |
| LED Lighting System | $184 |
| Foot Rail Kit + Hardware | $279 |
| Miscellaneous | $40 |
| **Materials Total** | **$840** |

### Optional Costs

| Item | Cost |
|------|------|
| Electrician (new circuit) | $150-$300 |
| Smart LED upgrade (Philips Hue) | +$100 |
| Premium foot rail (KegWorks custom) | +$100 |

### Budget Option Total

If using budget alternatives:
- Mockett outlet instead of Lew Electric: -$100
- Outwater satin stainless foot rail: -$60
- **Budget Materials Total:** ~$680

---

## 9. Safety Considerations

### Electrical Safety

1. **Turn off power** before any electrical work
2. **Verify dead circuit** with voltage tester
3. **GFCI protection** is mandatory for countertop outlet
4. **Never defeat GFCI** - it's a life-safety device
5. **Use proper wire gauge** - 12 AWG for 20A circuit

### Low Voltage Safety

1. 24V DC is safe to touch (Class 2 compliant)
2. Still disconnect power before working on LED circuits
3. Keep power supply accessible for service
4. Do not exceed power supply capacity

### Foot Rail Safety

1. Install backing blocks for secure mounting
2. Verify mounting screws penetrate backing
3. Test stability before use
4. Check periodically for loose brackets

---

## 10. Maintenance Schedule

| Component | Maintenance | Frequency |
|-----------|-------------|-----------|
| Pop-up outlet | Test GFCI button | Monthly |
| Pop-up outlet | Clean mechanism | Quarterly |
| LED strips | Dust with soft cloth | Monthly |
| LED power supply | Check for dust buildup | Annually |
| Motion sensor | Adjust sensitivity if needed | As needed |
| Foot rail | Wipe clean | Weekly |
| Foot rail | Check bracket tightness | Quarterly |

---

## 11. Supplier Links

### Pop-Up Outlet

- [Kitchen Power Pop Ups (Lew Electric)](https://www.kitchenpowerpopups.com/products/lew-electric_pur20-bk-gfi-2usb-ac)
- [Amazon Lew Electric](https://www.amazon.com/Lew-Electric-PUFP-CT-Countertop-Receptacle/dp/B081VWMCW5)

### LED Lighting

- [HitLights LED Strips](https://www.hitlights.com/)
- [Amazon LED Strip Lights](https://www.amazon.com/LED-strip-lights-cabinets/s?k=LED+strip+lights+for+cabinets)
- [Super Bright LEDs](https://www.superbrightleds.com/led-residential-lighting/undercabinet-lighting-fixtures)

### Foot Rail

- [Top Hardware](https://www.tophardware.com/product/ft-rl-2od-bstainless-steel-bar-foot-rail-kit-custom-made-black-2%E2%80%B3-od-tube/)
- [KegWorks](https://www.kegworks.com/bar-mount-foot-rail-bracket-matte-black-2-od/)
- [Amazon Bar Foot Rail Kits](https://www.amazon.com/Stainless-Tubing-Internal-Connector-Bracket/dp/B09B4G6TWM)

---

## 12. Document Index

| Document | Purpose |
|----------|---------|
| **ELECTRICAL-PLAN.md** (this file) | Master plan, summary, shopping list |
| [outlet-options.md](outlet-options.md) | Detailed outlet research, code compliance |
| [led-lighting.md](led-lighting.md) | LED specifications, power calculations |
| [foot-rail.md](foot-rail.md) | Foot rail design, mounting details |
| [wire-routing.md](wire-routing.md) | Wire diagrams, installation sequence |

---

## Approval Checklist

Before proceeding with purchase/installation:

- [ ] Review all dimensions against FINAL-DESIGN.md
- [ ] Verify existing kitchen circuit availability
- [ ] Confirm matte black finish matches other hardware
- [ ] Check local permit requirements
- [ ] Verify countertop thickness for pop-up depth (need 5.5" minimum)
- [ ] Confirm motion sensor location won't trigger from living room

---

*Document created: 2026-01-09*
*Agent: WS7 Electrical*
*Status: Ready for human review*
