# Critical Path Analysis

**Kitchen Bar Cabinet Project - Dependency Mapping and Parallel Work Optimization**

---

## Understanding Critical Path

The **critical path** is the longest sequence of dependent tasks. Any delay on the critical path delays the entire project. Tasks OFF the critical path have "float" - they can be delayed without affecting project completion.

**Goal:** Identify the critical path, optimize it, and use float time wisely.

---

## Project Critical Path

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CRITICAL PATH                                     │
│                                                                             │
│  Hardware      Plywood         Cabinet Box        Paint        Hardware     │
│  Delivery  →   Cutting    →    Assembly     →     Curing   →   Install     │
│  (3-5 days)    (4 hrs)         (6 hrs)           (48 hrs)      (4 hrs)     │
│                                                                             │
│                         ↓ Must be square                                    │
│                                                                             │
│                    Living Room            Barn Door                         │
│                    Panel Attach   →       Track Install                     │
│                    (1 hr)                 (1 hr)                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Critical Path Duration: 11-12 days (including shipping + cure times)

The critical path is dominated by:
1. **Hardware shipping time** (3-5 days) - must order first
2. **Cabinet box assembly** (must be square before proceeding)
3. **Paint curing time** (48 hours between final coat and hardware)
4. **Living room panel** (must be installed before barn door track)

---

## Detailed Dependency Map

### Phase 1: Pre-Build Dependencies

```
Order Hardware (Day 0)
    └── Must arrive before: Hardware Installation (Day 10+)

Buy Plywood (Day 0)
    └── Store rip cuts depend on: Nothing
    └── Required for: All cutting

Buy Paint & Supplies (Day 0)
    └── Required for: Finishing phase
```

### Phase 2: Fabrication Dependencies

```
Store Rip Cuts (Day 1)
    │
    ├── Crosscuts (all) ←── Depends on rip cuts
    │   └── Depends on: Store rip cuts complete
    │
    ├── Pocket Holes (all) ←── Depends on crosscuts
    │   └── Depends on: All pieces cut to size
    │
    └── Electrical Holes ←── Depends on dividers cut
        └── Depends on: Dividers cut and labeled
```

### Phase 3: Assembly Dependencies

```
CRITICAL: Cabinet Box Assembly

Toe Kick Platform
    └── Independent - can build anytime after cutting

Cabinet Bottom + Dividers
    └── Depends on: All cabinet pieces cut, pocket holes drilled

Cabinet Top
    └── Depends on: Bottom + Dividers assembled and SQUARE

Living Room Panel
    └── Depends on: Cabinet box complete and square
    └── CRITICAL: Must install before barn door track
```

### Phase 4: Sub-Assembly Dependencies

```
These run PARALLEL to main assembly:

Drawer Boxes (3)
    └── Independent after drawer parts cut
    └── Can build during cabinet assembly
    └── Must cure before slide installation

X-Frame Panels (doors)
    └── Independent after panel pieces cut
    └── Can build during cabinet assembly
    └── Must cure before painting

Barn Door Panel
    └── Independent after panel cut
    └── Can build anytime
    └── Must finish before track installation
```

### Phase 5: Finishing Dependencies

```
Priming
    └── Depends on: All pieces sanded
    └── Must mask glue joints first

First Paint Coat
    └── Depends on: Primer dry (2 hours)

Second Paint Coat
    └── Depends on: First coat dry (4 hours)
    └── Light sand between coats

Hardware Installation
    └── Depends on: Final coat CURED (48 hours ideal, 24 min)
    └── CRITICAL: Paint must be hard enough to not mar
```

### Phase 6: Hardware Dependencies

```
Drawer Slide Cabinet-Side
    └── Depends on: Cabinet interior painted and cured

Drawer Slide Drawer-Side
    └── Depends on: Drawer boxes complete
    └── Can install before cabinet slides

Drawer Installation
    └── Depends on: Both slide components installed

Drawer Front Attachment
    └── Depends on: Drawer slides working correctly
    └── LAST step for drawers

Barn Door Track
    └── Depends on: Living room panel installed
    └── Depends on: Paint cured

Barn Door Hang
    └── Depends on: Track installed and level
    └── Depends on: Door painted and cured

Hinge Installation
    └── Depends on: Door panels painted and cured
    └── Depends on: Cabinet face frames ready
```

---

## Float Analysis

### High Float Tasks (Can Be Delayed Without Affecting Project)

| Task | Float Time | Notes |
|------|------------|-------|
| Drawer box construction | 3-4 days | Build anytime before slide install |
| X-frame panel trim | 2-3 days | Build anytime before painting |
| Barn door panel construction | 3-4 days | Build anytime before painting |
| Handle/pull installation | Until project end | Very last task |
| Electrical wiring | 2-3 days | After cabinet positioned, before toe kick cover |
| Toe kick platform | 3-4 days | Build early, install late |

### Zero Float Tasks (CRITICAL PATH - No Delay Allowed)

| Task | Why Critical |
|------|--------------|
| Hardware ordering | Must arrive before installation phase |
| Cabinet box assembly | All other assembly depends on this |
| Living room panel installation | Barn door track depends on this |
| Paint curing | Hardware installation depends on cure |
| Drawer slide alignment | Drawer fronts depend on working slides |

---

## Bottleneck Analysis

### Bottleneck 1: Hardware Shipping (3-5 days)

**The Problem:**
Online hardware (slides, hinges, barn door kit) takes 3-5 days to arrive. If you wait until Weekend 1 to order, you can't install until Weekend 3+.

**The Solution:**
Order ALL hardware before starting ANY physical work. Order the moment you commit to the project.

**Hardware to Order First:**
- Drawer slides (3 pairs, 14" soft-close)
- Barn door hardware kit (72" with soft-close)
- European cup hinges (3 pairs)
- Drawer/door pulls (6-9 pieces)
- Foot rail mounting kit (if using)

### Bottleneck 2: Paint Drying Time (48 hours)

**The Problem:**
Paint needs 48 hours to fully cure before hardware installation. Fresh paint mars when screws are driven or tools touch it.

**The Solution:**
Plan paint timing around the weekend schedule:
- Paint Friday evening → Cure Saturday/Sunday → Install Monday
- Or: Paint early Saturday → Cure through Monday → Work Tuesday
- Or: Accept 24-hour cure (minimum) with extra care

**The Alternative:**
Pre-finish components before assembly:
- Interior faces: prime/paint before assembly
- Exterior faces: paint assembled box
- Drawer fronts: paint separately
- Door panels: paint separately

This allows staggered curing - not everything cures at once.

### Bottleneck 3: Cabinet Box Squareness

**The Problem:**
If the cabinet box is not square, everything that follows will be off. Drawers won't fit, doors won't align, countertop won't sit flat.

**The Solution:**
This is a mandatory quality gate. Build in 1 hour buffer for squaring:
- Measure diagonals after each assembly step
- Have clamps and shims ready
- Do not proceed until diagonals are within 1/4"

**The Recovery:**
If you discover out-of-square after glue has cured:
- Minor (<1/4"): Shim during installation
- Moderate (1/4"-1/2"): Disassemble, re-glue
- Severe (>1/2"): Scrap and re-cut pieces (rare if checking during assembly)

---

## Parallel Work Opportunities

### During Hardware Shipping (Days 0-5)

While waiting for hardware to arrive:

| Window | Duration | Parallel Task |
|--------|----------|---------------|
| Day 1 | 4-5 hrs | All cutting and prep |
| Day 2 | 3-4 hrs | All pocket holes and sanding |
| Day 3 | 4-6 hrs | Cabinet box assembly |
| Day 4 | 2-3 hrs | Living room panel, drawer boxes |
| Day 5 | 3-4 hrs | X-frame panels, priming |

**Result:** By the time hardware arrives, cabinet is built and primed.

### During Glue Cure Times

| Curing | Duration | Parallel Task |
|--------|----------|---------------|
| Toe kick glue | 30 min | Cut next set of parts |
| Box assembly glue | 30 min | Start drawer boxes |
| Drawer box glue | 30 min | Work on X-frame panels |
| Overnight cure | 8+ hrs | No work (rest!) |

### During Paint Dry Times

| Drying | Duration | Parallel Task |
|--------|----------|---------------|
| Primer drying | 2 hrs | Drill electrical holes |
| First coat drying | 4 hrs | Build drawer boxes |
| Between coats | 4 hrs | Test-fit hardware on scrap |
| Final cure | 24-48 hrs | Prepare installation site, run electrical |

---

## Optimized Weekend Schedule

### Week Before: Pre-Work
- Order all hardware online
- Buy all materials at store
- Have store rip plywood to widths

### Weekend 1: Fabrication and Box Assembly
**Saturday (6-8 hours):**
- Morning: All crosscuts with miter saw
- Midday: All pocket holes
- Afternoon: Sand all pieces, prime interior faces

**Sunday (4-6 hours):**
- Morning: Assemble toe kick platform
- Midday: Assemble cabinet bottom + dividers + top
- Afternoon: Verify square, attach living room panel

**Parallel during Weekend 1:**
- While primer dries: drill electrical holes
- While glue cures: cut X-frame trim pieces

### Weekend 2: Sub-Assemblies and Finishing
**Saturday (5-6 hours):**
- Morning: Build drawer boxes (all 3)
- Midday: Build X-frame panels and barn door
- Afternoon: Final sand, first paint coat on everything

**Sunday (3-4 hours):**
- Morning: Second paint coat
- Afternoon: Touch-ups, let cure

**Parallel during Weekend 2:**
- While paint dries: test-assemble hardware on scraps
- While waiting for cure: prepare installation location

### Weekend 3: Hardware and Integration
**Saturday (6-8 hours):**
- Morning: Install drawer slides (cabinet and drawer)
- Midday: Install and test drawers
- Afternoon: Install barn door track and hang door

**Sunday (4-5 hours):**
- Morning: Install hinges and doors
- Midday: Attach drawer fronts, install handles
- Afternoon: Run electrical, final adjustments

### Weekend 4: Finalization (If Needed)
- Install toe kick facing
- Touch-up paint
- Final adjustments
- Clean up

---

## Risk Mitigation

### Risk 1: Hardware Delayed or Wrong

**Mitigation:**
- Order from reliable source (Amazon Prime, Home Depot ship-to-store)
- Order 1-2 days early as buffer
- Check specifications carefully before ordering

**Recovery:**
- Local hardware stores carry basic slides (may not be soft-close)
- Cabinet can be installed without hardware temporarily

### Risk 2: Plywood Shortage or Damage

**Mitigation:**
- Inspect all plywood before leaving store
- Buy 10% extra for mistakes
- Keep receipts for returns

**Recovery:**
- Plywood is readily available
- Can substitute pieces from extra material

### Risk 3: Cabinet Out of Square

**Mitigation:**
- Check square at every assembly step
- Use 4' level, framing square, and diagonal measurement
- Don't rush assembly

**Recovery:**
- Disassemble and re-glue if caught early
- Shim during installation if minor
- Accept compromised fit (last resort)

### Risk 4: Paint Doesn't Cure in Time

**Mitigation:**
- Use quality paint designed for cabinets
- Ensure adequate temperature (>60°F)
- Allow full cure time (48 hours ideal)

**Recovery:**
- Wait longer (patience is cheaper than rework)
- Apply wax paper between painted surfaces and tools
- Touch up any mars after full cure

---

## Summary: The Optimized Critical Path

**Total Duration:** 3-4 weekends (assuming hardware ships in 5 days)

**Critical Sequence:**
1. Order hardware (Day 0)
2. Buy materials + store cuts (Day 1)
3. Complete fabrication (Weekend 1)
4. Assemble cabinet box (Weekend 1)
5. Complete sub-assemblies (Weekend 2)
6. Paint all components (Weekend 2)
7. Cure time (2-4 days)
8. Install hardware (Weekend 3)
9. Final integration (Weekend 3-4)

**Total Active Work Hours:** 35-40 hours

**Key Optimization:** By ordering hardware first and doing store rip cuts, you eliminate the two biggest time sinks and can complete the project 1-2 weekends faster than the original estimate.
