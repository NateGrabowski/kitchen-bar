# Kitchen Bar Design Exploration Plan

> **For Claude:** This is a research + decision plan. Follow phases sequentially, checkpoint with user between phases. Start with Phase 0 to ensure full project understanding.

**Goal:** Explore split-level bar design options thoroughly before committing to a build approach

**Current State:**
- Two visualization files exist (different cabinet placement approaches)
- User has done physical validation (measurements, sat at the step)
- User is flexible on design, wants to explore more options

**Fixed Constraints:**
- Step height: 23.5" (architectural, cannot change)
- Bar length: ~84" (fits existing span)
- Seating: Kitchen side, facing living room
- Material preference: Butcher block top

---

## Phase 0: Project Understanding

**Purpose:** Ensure full understanding of the space, constraints, and current design state before researching alternatives.

### Task 0.1: Review Project Documentation

Read and understand:
- `docs/kitchen-bar-project-brief.md` — Full requirements, constraints, preferences
- `docs/design-spec.md` — Current baseline design decisions

**Verify understanding of:**
- Why seating is on kitchen side (not living room)
- What "continuous cabinet" means in this context
- The flush vs. tiered distinction
- Open questions that still need answers

---

### Task 0.2: View Reference Photos

Examine the actual space photos in `docs/images/.jpg/`:
- `1.jpg`, `2.jpg`, `3.jpg` — Main reference photos
- `extra/IMG_*.jpg` — Additional angles

**Note:**
- Current railing style and condition
- Support column location and appearance
- Kitchen cabinet style (honey oak)
- Step area dimensions and how it looks
- Living room view angles
- Any constraints not captured in docs

---

### Task 0.3: Run Current Visualizations

Start the dev server and examine both visualization tools:

```bash
npm run dev
# Open http://localhost:5173
```

**Review:**
1. **kitchen-bar-planner** (v4) — Cabinets in living room
   - Try flush vs. tiered presets
   - Check all four views (side, front, plan, construction)
   - Note what the construction view currently shows

2. **kitchen-floor-cabinets-sketch** — Cabinets on kitchen floor
   - Compare dimensions and trade-offs
   - Note the "simpler build" approach

**Document:**
- What each approach does well
- What's missing or unclear
- Questions that arise from the visualizations

---

### Task 0.4: Summarize Current Understanding

Create a brief summary:
- What we know for certain
- What's still undecided
- What options are currently represented
- What options might be missing

**Checkpoint:** Review summary with user before proceeding to research.

---

## Phase 1: Design Research

**Purpose:** Gather inspiration and understand trade-offs for options not yet explored.

**Prerequisites:** Phase 0 complete, user confirms understanding is solid.

### Task 1.1: Structural Approaches Research
**Use:** `deep-research` skill

Research how split-level bars are framed and supported:
- Cantilever designs (overhang without posts)
- Post-supported designs
- Wall-anchored designs
- Hybrid approaches
- Load requirements for seating areas
- Code considerations for residential bars

**Search terms from project brief:**
- "Split-level kitchen bar peninsula"
- "Kitchen half wall bar with storage"
- "Step-down kitchen bar counter"

**Output:** Summary of structural options with pros/cons

---

### Task 1.2: Cabinet Configuration Research
**Use:** `deep-research` skill

Research storage placement options beyond the two current approaches:
- Living room side cabinets (current v4 approach)
- Kitchen floor cabinets (current sketch approach)
- Floating shelves vs closed cabinets
- Built-in vs modular cabinet systems
- Hybrid configurations (some above, some below step)
- Access patterns (which side do doors face?)
- Step-integrated storage (drawers in the riser itself)

**Output:** Summary of cabinet options with trade-offs

---

### Task 1.3: Bar Top Design Research
**Use:** `deep-research` skill

Research counter/bar top configurations:
- Single-level flush designs
- Tiered/bi-level designs (beyond current +6" option)
- Waterfall edge variations
- L-shape or wrap-around options
- Curved or angled approaches
- Multi-material combinations
- How butcher block performs in each configuration

**Output:** Summary of bar top options with examples

---

### Task 1.4: Creative/Unconventional Ideas
**Use:** `deep-research` skill

Look for creative approaches to split-level transitions:
- Built-in seating (banquette into step)
- Pass-through windows or openings
- Integrated lighting features
- Convertible or multi-function designs
- Examples from restaurants, commercial spaces
- How others have handled ~24" step transitions

**Output:** Inspiration gallery with applicability notes

---

### Task 1.5: Research Synthesis

Consolidate all research into a single reference document:
- Save to `docs/research/2026-01-04-split-level-bar-options.md`
- Include sources and images where helpful
- Highlight options most relevant to 23.5" step constraint

**Checkpoint:** Review research findings with user.

---

## Phase 2: Concept Sketching ("Sketch to See")

**Purpose:** Create quick visual sketches of creative concepts so user can SEE options before committing.

**Prerequisites:** Phase 1 complete, user has reviewed research.

**Key Insight:** Separate JSX files work better than one complex switcher. Each concept gets its own focused visualization file.

### Task 2.1: Select 3 Contrasting Concepts

Pick 3 concepts from creative research at different "boldness" levels:

| Level | Example Concepts |
|-------|------------------|
| Moderate | Live edge + waterfall, chevron pattern, unique wood species |
| Bold | Copper patina, epoxy river, speakeasy hidden features |
| Very Bold | Backlit stone, aquarium cabinet, floating cantilever |

**Starting selection:**
1. **Live edge + waterfall** — Natural edge facing LR, wood cascades down step
2. **Chevron top + speakeasy features** — Preferred material + hidden storage/reveals
3. **Floating cantilever + step lighting** — Dramatic architecture, bar appears to hover

---

### Task 2.2: Create Quick Sketch Visualizations

For each concept, create a focused JSX file:
- Copy `kitchen-bar-planner-v4.jsx` as starting point
- Strip down to 1-2 views (side section is primary)
- Focus on the ONE differentiating idea
- Keep it simple—enough to convey the concept

**Output files:**
```
visualization/jsx/
  concept-live-edge-waterfall.jsx
  concept-chevron-speakeasy.jsx
  concept-floating-cantilever.jsx
```

---

### Task 2.3: User Review & Feedback Loop

Present sketches to user. Possible outcomes:

| Response | Action |
|----------|--------|
| "This one resonates" | Proceed to Phase 3 with that concept |
| "I like X from concept A, Y from concept B" | Create hybrid sketch, re-review |
| "None of these work" | Loop back to Task 2.1, pick 3 different concepts |
| "I like the direction but need refinement" | Iterate on that sketch |

```
┌─────────────────────────────────────────┐
│  Create 3 concept sketches              │
└──────────────────┬──────────────────────┘
                   ▼
┌─────────────────────────────────────────┐
│  User reviews & reacts                  │
└──────────────────┬──────────────────────┘
                   ▼
        ┌─────────┴─────────┐
        ▼                   ▼
   [Nothing works]    [Something works]
        │                   │
        ▼                   ▼
   Loop: try 3 more    Continue to Phase 3
   different concepts  (validation, dimensions)
```

**Checkpoint:** User selects concept(s) to pursue before proceeding.

---

## Phase 3: Design Validation

**Purpose:** Validate chosen approach against physical space.

**Prerequisites:** User has selected preferred design direction.

### Task 3.1: Dimension Check

For selected design(s):
- Verify all dimensions work with 23.5" step
- Check ergonomics (knee space, seat height, etc.)
- Identify any clearance issues
- Compare to photos for fit

---

### Task 3.2: Mock-up Recommendations

Suggest physical validation steps:
- Cardboard mock-ups for key dimensions
- Tape layout on floor for footprint
- Sitting test with actual stool height
- Verify clearance near stairs/traffic areas

---

### Task 3.3: Final Design Spec

Document the chosen design:
- All dimensions finalized
- Materials list
- Construction approach decided
- Update `docs/design-spec.md` with final decisions
- Answer open questions from project brief

**Checkpoint:** User approves final design spec.

---

## Phase 4: Tool Improvements (Optional)

**Purpose:** Update visualization tool to support final design and construction planning.

**Prerequisites:** Phase 3 complete, final design approved.

### Task 4.1: Assess Current Tool Gaps

Based on chosen design, determine if visualization needs updates:
- Does current v4 or sketch file support the design?
- What views are missing or inadequate?
- Is the construction view detailed enough for actual building?

---

### Task 4.2: Plan Tool Updates

If updates needed, create specific tasks:
- List changes required
- Prioritize by value (what helps most with build planning?)
- Consider: framing details, electrical routing, materials cut list

---

### Task 4.3: Implement Updates

Use TDD approach for any code changes:
- Write tests for new functionality (if applicable)
- Implement changes
- Verify with visual inspection
- Commit with clear message

---

## Execution Notes

**Phase 0** should be thorough but doesn't require external research.

**Phase 1** tasks (1.1-1.4) can run in parallel as independent research streams.

**Phase 2** is iterative—may loop multiple times until a concept resonates. Each concept gets its own JSX file (not one master file). Keep sketches simple and focused.

**Phase 3** depends on user selecting a concept in Phase 2.

**Phase 4** is optional based on Phase 3 outcomes.

---

## Checkpoints Summary

| After Phase | User Decision Required |
|-------------|------------------------|
| Phase 0 | Confirm understanding is correct, proceed to research |
| Phase 1 | Review research, confirm it's sufficient |
| Phase 2 | Review concept sketches → "works" / "try different" / "hybrid" (may loop) |
| Phase 3 | Approve final design spec |
| Phase 4 | Decide if tool updates are worth doing |

---

## Files to Reference

**Documentation:**
- `docs/kitchen-bar-project-brief.md` — Full project context
- `docs/design-spec.md` — Current baseline design

**Research (Phase 1 outputs):**
- `docs/research/2026-01-04-split-level-bar-options.md` — Structural research (framing, brackets, cantilever)
- `docs/research/2026-01-04-creative-bar-concepts.md` — Creative/unconventional concepts

**Images:**
- `docs/images/.jpg/1.jpg`, `2.jpg`, `3.jpg` — Main reference photos
- `docs/images/.jpg/extra/` — Additional angles

**Visualizations:**
- `visualization/jsx/kitchen-bar-planner-v4.jsx` — Main tool (LR cabinets)
- `visualization/jsx/kitchen-floor-cabinets-sketch.jsx` — Alternative (kitchen cabinets)
- `visualization/jsx/concept-*.jsx` — Phase 2 concept sketches (created during Phase 2)

**Run with:**
```bash
npm run dev
# Open http://localhost:5173
```
