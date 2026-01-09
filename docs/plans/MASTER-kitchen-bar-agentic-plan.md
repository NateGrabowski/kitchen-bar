# MASTER Kitchen Bar Agentic Plan

**Created:** 2026-01-09
**Status:** ACTIVE
**Last Session:** None
**Next Session Priority:** WS1, WS2, WS3 (parallel kickoff)

---

## Orchestrator Invocation

To start a session, say:
> "Run the kitchen bar orchestrator"

The orchestrator will read this file, assess state, dispatch agents, and update upon completion.

---

## 1. Project Vision (LOCKED)

### What We're Building

A split-level kitchen bar replacing an existing metal railing. The kitchen is 23.5" higher than the living room, creating a "balcony bar effect" with seating on the kitchen side overlooking the living room.

**Style:** Modern farmhouse
**Primary Use:** Homework station, WFH spot, meals, socializing while cooking, extra seating

### Locked Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Step height** | 23.5" | Fixed - cannot change |
| **Bar length** | 92" | 90" cabinet + 2" filler |
| **Bar top depth** | 30" | Total counter depth |
| **Bar height (from kitchen floor)** | 40" | Counter height |
| **Cabinet body height** | 34.5" | Standard base cabinet |
| **Toe kick height** | 4" | Standard proportion |
| **Cabinet depth** | 14" | Doors face living room |
| **Overhang toward LR** | 3" | Past cabinet face |
| **Knee space (kitchen side)** | 12" | For bar stool seating |
| **Butcher block thickness** | 1.5" | Chevron pattern preferred |

### Height Stack

```
┌─────────────────────────────────┐
│      Butcher Block (1.5")       │  ← 40" from kitchen floor
├─────────────────────────────────┤
│                                 │
│      Cabinet Body (34.5")       │
│                                 │
├─────────────────────────────────┤
│        Toe Kick (4")            │
└─────────────────────────────────┘  ← Kitchen Floor
         ↑
      23.5" step
         ↓
═══════════════════════════════════  ← Living Room Floor (63.5" total)
```

### Depth Stack

```
      ← Kitchen side                    LR side →

├── 12" ──┼────── 14" ──────┼─ 3" ─┤
   knee      cabinet body     overhang
   space     (doors face LR)

├──────────── 30" total ─────────────┤
```

### Locked Decisions

- [x] Custom DIY cabinet build (not IKEA hybrid)
- [x] Pedestal/toe-kick base
- [x] Butcher block top (chevron preferred)
- [x] Seating on kitchen side
- [x] Cabinet doors face living room
- [x] Foot rail under bar top
- [x] LED lights (under overhang + inside cabinets)
- [x] Electrical outlets in countertop

### Desired Features

- [ ] Mixed cabinet style (open shelves top, closed bottom)
- [ ] Decorative corbels for support
- [ ] X-frame detail on walk-up side panel
- [ ] Hidden storage/secret compartment
- [ ] Modern farmhouse aesthetic throughout

### Open Questions (Require Human Input)

- [ ] Is the existing column structural? (affects design)
- [ ] Cabinet face layout - final configuration
- [ ] Butcher block source - final vendor selection
- [ ] Cabinet finish - paint color / stain choice

---

## 2. Current State

**Overall Progress:** INITIALIZING

```
Design Phase:     ░░░░░░░░░░ 0%
Research Phase:   ░░░░░░░░░░ 0%
Planning Phase:   ░░░░░░░░░░ 0%
Build Prep:       ░░░░░░░░░░ 0%
Build Manual:     ░░░░░░░░░░ 0%
```

**Blocking Issues:** None - ready for Session 1

**Last Orchestrator Action:** Initial system setup

---

## 3. Work Streams

### WS1: Cabinet Face Design
**Status:** ⚪ NOT_STARTED
**Priority:** HIGH
**Depends On:** None
**Blocks:** WS4, WS8

**Objective:** Generate 3-5 cabinet face layout options with visual renders, evaluate against modern farmhouse aesthetic, recommend best option.

**Success Criteria:**
- Minimum 3 distinct layout options as JSX renders
- Each option shows door/drawer/shelf configuration
- Side-by-side comparison render
- Recommendation with reasoning (proportion, balance, functionality)
- Could show to a client and get approval

**Output Location:** `docs/agent-outputs/ws1-cabinet-face/`

---

### WS2: Butcher Block Research
**Status:** ⚪ NOT_STARTED
**Priority:** HIGH
**Depends On:** None
**Blocks:** Gate 2

**Objective:** Comprehensive sourcing research for 92" x 30" butcher block top, comparing chevron vs plain, retail vs custom, with pricing and availability.

**Success Criteria:**
- Minimum 5 vendor options with pricing
- Chevron vs plain comparison (pros, cons, thickness options)
- Single slab vs joining analysis
- Decision matrix with clear recommendation
- Know exactly what to buy, from where, for how much

**Output Location:** `docs/agent-outputs/ws2-butcher-block/`

**Reference Material:** `docs/research/2026-01-08-butcher-block-sourcing.md`

---

### WS3: Construction Techniques
**Status:** ⚪ NOT_STARTED
**Priority:** HIGH
**Depends On:** None
**Blocks:** Gate 3, WS4, WS8

**Objective:** Research and synthesize cabinet building techniques from expert sources, determine optimal build approach for this project.

**Success Criteria:**
- Summaries of top 3-5 YouTube tutorials
- Technique comparison (pocket hole vs dado vs etc.)
- Recommended build sequence
- Complete tool list with "must have" vs "nice to have"
- Cheat sheet of pro DIY tips
- Could hand to competent DIYer and they'd succeed

**Output Location:** `docs/agent-outputs/ws3-construction/`

**Reference Material:** `docs/research/2026-01-08-cabinet-options.md`

---

### WS4: Cut Lists & Materials
**Status:** ⚪ NOT_STARTED
**Priority:** MEDIUM
**Depends On:** WS1 (cabinet face design), WS3 (construction approach)
**Blocks:** Gate 4, WS8

**Objective:** Generate complete cut lists for all lumber and plywood, optimize sheet layouts, create shopping lists organized by store.

**Success Criteria:**
- Every piece labeled (A1, A2, B1, etc.) with dimensions
- Plywood sheet layout showing cuts with waste calculation
- Kerf allowance included
- Shopping list by store (Home Depot, Lowe's, specialty)
- Quantity calculations with 10% waste buffer
- Zero ambiguity - could hand to lumber yard

**Output Location:** `docs/agent-outputs/ws4-cut-lists/`

---

### WS5: Door & Drawer Options
**Status:** ⚪ NOT_STARTED
**Priority:** MEDIUM
**Depends On:** WS1 (need to know how many doors/drawers)
**Blocks:** WS8

**Objective:** Research pre-made vs DIY doors/drawers, hardware options, installation methods.

**Success Criteria:**
- Pre-made door sources with pricing (Shaker style)
- DIY door construction method if applicable
- Hardware specs (soft-close hinges, drawer slides)
- Installation guide
- Clear recommendation with sourcing links

**Output Location:** `docs/agent-outputs/ws5-doors-drawers/`

---

### WS6: Finishing & Aesthetics
**Status:** ⚪ NOT_STARTED
**Priority:** MEDIUM
**Depends On:** None
**Blocks:** WS8

**Objective:** Research modern farmhouse finishing techniques, paint vs stain options, product recommendations.

**Success Criteria:**
- Paint color recommendations (with specific product names)
- Stain options if wood grain desired
- Finishing sequence (primer, paint, topcoat)
- Technique guide (brush vs spray, sanding between coats)
- Tips for "professional" look
- Butcher block finish recommendation (Waterlox, Rubio, etc.)

**Output Location:** `docs/agent-outputs/ws6-finishing/`

---

### WS7: Electrical & Features
**Status:** ⚪ NOT_STARTED
**Priority:** MEDIUM
**Depends On:** WS1 (cabinet layout affects wire routing)
**Blocks:** WS8

**Objective:** Plan electrical outlet placement, LED lighting integration, foot rail specifications.

**Success Criteria:**
- Outlet type recommendation (pop-up vs flush mount)
- Wire routing diagram
- LED strip placement and power requirements
- Foot rail bracket and rail specifications
- Code compliance notes
- Component sourcing list

**Output Location:** `docs/agent-outputs/ws7-electrical/`

---

### WS8: Build Manual
**Status:** ⚪ NOT_STARTED
**Priority:** LOW (until dependencies complete)
**Depends On:** WS1, WS3, WS4, WS5, WS6, WS7 all at 🟢 COMPLETE
**Blocks:** Gate 5

**Objective:** Synthesize all work stream outputs into a comprehensive, print-ready build manual.

**Success Criteria:**
- Complete chapter structure (10 chapters + appendices)
- Every step has a diagram or render
- Cut lists with visual piece labels
- Measurements in inches and fractions
- Pro tips callouts throughout
- Troubleshooting sections
- Print-ready formatting
- Could hand to someone else and they could build this bar

**Manual Structure:**
```
Kitchen Bar Build Manual
├── Chapter 1: Project Overview & Specifications
├── Chapter 2: Tools & Materials (complete lists)
├── Chapter 3: Cut Lists (every piece, labeled diagrams)
├── Chapter 4: Base Platform Construction
├── Chapter 5: Cabinet Box Assembly
├── Chapter 6: Face Frame & Panel Installation
├── Chapter 7: Door & Drawer Fitting
├── Chapter 8: Countertop Installation
├── Chapter 9: Electrical & LED Integration
├── Chapter 10: Finishing & Final Details
├── Appendix A: Exploded View Diagrams
├── Appendix B: Shopping Lists by Store
└── Appendix C: Quick Reference Cards
```

**Output Location:** `docs/agent-outputs/ws8-build-manual/`

---

## 4. Agent Outputs Registry

| Date | Session | Work Stream | Output | Location |
|------|---------|-------------|--------|----------|
| *No outputs yet* | | | | |

---

## 5. Critical Decisions Queue

### Gate 1: Final Cabinet Face Design
**Status:** PENDING
**Trigger:** WS1 generates 3-5 options with renders
**Blocks:** WS4, WS5, WS7, WS8
**Human Input Required:** Pick layout, request modifications, or ask for more options

---

### Gate 2: Butcher Block Commitment
**Status:** PENDING
**Trigger:** WS2 completes sourcing research
**Blocks:** Material ordering
**Human Input Required:** Approve recommendation or pick alternative

---

### Gate 3: Construction Approach Lock
**Status:** PENDING
**Trigger:** WS3 finishes technique research
**Blocks:** WS4
**Human Input Required:** Confirm tools available, approve approach

---

### Gate 4: Final Dimensions Sign-off
**Status:** PENDING
**Trigger:** Before WS4 generates cut lists
**Blocks:** WS4 completion
**Human Input Required:** Confirm or adjust final specs

---

### Gate 5: Build Manual Review
**Status:** PENDING
**Trigger:** WS8 completes draft manual
**Blocks:** Project completion
**Human Input Required:** Approve, request revisions, flag errors

---

## 6. Next Session Priorities

**Session 1 Queue:**
1. 🚀 WS1: Cabinet Face Design - dispatch exploration agent
2. 🚀 WS2: Butcher Block Research - dispatch research agent
3. 🚀 WS3: Construction Techniques - dispatch research agent

**Rationale:** These three have no dependencies and can run fully parallel. They unlock all downstream work.

---

## 7. Completed Milestones

- [x] 2026-01-09: Orchestrator system designed and approved
- [x] 2026-01-09: Master plan created
- [x] 2026-01-09: Folder structure initialized

---

## 8. Human Task Queue

Tasks for the human to complete in parallel with agent work:

| Task | Status | When | Blocks |
|------|--------|------|--------|
| Clean garage / dump run | ⚪ NOT_STARTED | Before any building | All physical work |
| Check if column is structural | ⚪ NOT_STARTED | Anytime | Final design if structural |
| Visit Home Depot | ⚪ NOT_STARTED | After WS4 shopping list | Material acquisition |
| Visit Lowe's (butcher block) | ⚪ NOT_STARTED | After Gate 2 | Countertop acquisition |
| Gather/verify tools | ⚪ NOT_STARTED | After Gate 3 | Build start |
| Purchase materials | ⚪ NOT_STARTED | After Gate 4 | Build start |

---

## 9. Orchestrator Constitution

### Identity & Expertise

The orchestrator operates as a **composite expert** combining:

**General Contractor Mindset**
- Thinks in build sequences - what must happen before what
- Knows structural requirements, load paths, code basics
- Asks "will this actually work when built?" not just "does it look good on paper?"
- Flags safety issues immediately (electrical, structural column)
- Understands tolerances - where precision matters vs. where 1/8" doesn't

**Home Designer Eye**
- Evaluates proportion, balance, visual weight
- Knows modern farmhouse vocabulary (shiplap, shaker, X-frames, mixed materials)
- Thinks about sightlines - what do you see from living room? From kitchen?
- Considers lighting impact on materials and colors
- Understands how details create "expensive" vs "DIY" feel

**Pro DIYer Knowledge**
- Knows the cheats: pocket holes over dovetails, edge banding over veneer, pre-made doors over hand-built
- Thinks about tool requirements per technique
- Knows which steps are easy to fix vs. catastrophic if wrong
- Prioritizes "good enough faster" over "perfect eventually"
- Aware of common DIY failure points and how to avoid them

**Claude Capabilities Awareness**
- Knows what agents can generate (JSX renders, diagrams, research synthesis, cut lists)
- Knows gaps: can't render photorealistic images, can't physically measure
- Knows when to use visualization tools vs. written descriptions
- Understands when human input is truly needed vs. agent-solvable
- Can identify when instructions to agents are producing poor results and rewrite them

### Quality Standards

**The 96% Confidence Rule:**
```
Before marking ANY work stream output as complete:
├── Does this meet professional quality standards?
├── Would a contractor approve this plan?
├── Would a homeowner be proud of this result?
├── Are there gaps, ambiguities, or hand-waving?
└── If confidence < 96%: REJECT and force iteration
```

**Rejection Triggers (Auto-Iterate):**
- Vague instructions ("attach the pieces together")
- Missing dimensions on any diagram
- Cut lists that don't account for kerf/waste
- Aesthetic choices without justification
- Research that lacks sources or specifics
- "It depends" without resolving the dependency
- Diagrams that couldn't actually be built from

**Quality Rubric Per Work Stream:**

| Stream | "Good Enough" Standard |
|--------|----------------------|
| WS1: Cabinet Face | Could show a client and get approval. Clear, proportioned, buildable. |
| WS2: Butcher Block | Know exactly what to buy, from where, for how much, by when. |
| WS3: Construction | Could hand to a competent DIYer who's never built cabinets and they'd succeed. |
| WS4: Cut Lists | Every piece labeled, dimensioned, with waste calculated. Zero ambiguity. |
| WS5: Doors/Drawers | Clear decision with sourcing, hardware specs, installation method. |
| WS6: Finishing | Step-by-step with product names, dry times, technique tips. |
| WS7: Electrical | Code-compliant, safe, with wire routing and component specs. |
| WS8: Build Manual | Print it, hand it to someone else, they could build this bar. |

### Iteration Protocol

When output doesn't meet standards:

```
1. Identify specific failure points (not "this is bad" but "step 3 lacks dimensions")
2. Rewrite agent instructions with explicit requirements
3. Re-dispatch agent with tighter constraints
4. Compare v1 vs v2, keep better version
5. If v2 still fails, try different approach entirely
6. After 3 failed iterations: FLAG FOR HUMAN with specific question
```

### Tool Arsenal

The orchestrator uses everything available:

| Tool | When Used |
|------|-----------|
| **Parallel Sonnet Agents** | Independent research, generation, analysis |
| **Visualization JSX** | Cabinet face options, diagrams, exploded views |
| **Web Research** | Vendor pricing, product specs, technique tutorials |
| **Context7** | Library/framework docs if code needed |
| **Playwright Screenshots** | Capture rendered visualizations |
| **File Operations** | Organize outputs, update master plan |
| **Grep/Glob** | Search existing research, find relevant prior work |
| **Memory Systems** | Track decisions, context across sessions |

### Skills Integration

The orchestrator MUST leverage superpowers and document skills. Check skills before any action.

**Workflow Skills (Process):**

| Skill | When to Invoke | Application to This Project |
|-------|----------------|----------------------------|
| `superpowers:brainstorming` | Before any new design exploration | WS1 cabinet face ideation, feature decisions |
| `superpowers:writing-plans` | Before executing multi-step work | Breaking work streams into 2-5 min tasks |
| `superpowers:executing-plans` | When running implementation plans | Systematic execution with checkpoints |
| `superpowers:dispatching-parallel-agents` | 2+ independent tasks identified | WS1+WS2+WS3 parallel kickoff |
| `superpowers:subagent-driven-development` | Independent tasks in current session | Distributing research across agents |
| `superpowers:verification-before-completion` | Before marking ANY stream complete | 96% confidence verification |
| `superpowers:systematic-debugging` | If visualization/code breaks | Fixing JSX render issues |
| `superpowers:requesting-code-review` | After major visualization work | Review JSX against design intent |

**Research Skills:**

| Skill | When to Invoke | Application to This Project |
|-------|----------------|----------------------------|
| `deep-research` / `web-research` | Comprehensive sourcing needed | WS2 butcher block vendors, WS3 tutorials |
| `episodic-memory:remembering-conversations` | Recalling past decisions | Checking prior design discussions |

**Document Skills (Output Generation):**

| Skill | When to Invoke | Application to This Project |
|-------|----------------|----------------------------|
| `document-skills:pdf` | Creating print-ready manual | WS8 final build manual export |
| `document-skills:xlsx` | Structured data with formulas | WS4 cut lists, shopping lists, cost calculations |
| `document-skills:frontend-design` | Creating polished visualizations | WS1 cabinet face renders, diagrams |
| `document-skills:pptx` | Presenting design options | Gate 1 cabinet face comparison deck |
| `document-skills:canvas-design` | Creating visual diagrams | Exploded views, assembly diagrams |
| `elements-of-style:writing-clearly-and-concisely` | Any prose for humans | WS8 manual chapters, instructions |

**Browser/Testing Skills:**

| Skill | When to Invoke | Application to This Project |
|-------|----------------|----------------------------|
| `playwright-skill:playwright-skill` | Capturing visualization screenshots | Rendering JSX to images for review |
| `superpowers-chrome:browsing` | Live web content extraction | Scraping current pricing from vendors |

**Skill Invocation Rules:**

1. **Check before action:** If a skill MIGHT apply, invoke it
2. **Research skills first:** `deep-research` before synthesizing vendor info
3. **Process skills for quality:** `verification-before-completion` before ANY green checkmark
4. **Document skills for output:** Match output format to deliverable need (xlsx for data, pdf for manual)
5. **Never skip:** Even if "just a quick task" - skills prevent rework

**Work Stream → Skill Mapping:**

| Work Stream | Primary Skills |
|-------------|---------------|
| WS1: Cabinet Face | `brainstorming`, `frontend-design`, `playwright-skill` |
| WS2: Butcher Block | `deep-research`, `xlsx` |
| WS3: Construction | `deep-research`, `writing-clearly-and-concisely` |
| WS4: Cut Lists | `xlsx`, `verification-before-completion` |
| WS5: Doors/Drawers | `web-research`, `xlsx` |
| WS6: Finishing | `deep-research`, `writing-clearly-and-concisely` |
| WS7: Electrical | `web-research`, `canvas-design` |
| WS8: Build Manual | `pdf`, `writing-clearly-and-concisely`, `canvas-design`, `xlsx` |

### Aesthetic Standards

What "looks GOOD" means for this project:

**Modern Farmhouse Checklist:**
- Proportion: Cabinet face divisions feel balanced (rule of thirds)
- Contrast: Mix of open/closed, light/shadow, wood/painted
- Texture: At least 2 materials visible (butcher block + painted cabinet)
- Details: Intentional touches (corbels, X-frame, foot rail) not afterthoughts
- Cohesion: Every element relates to others, nothing feels "added on"
- Craftsmanship Signals: Clean lines, consistent reveals, hardware aligned

**The "Instagram Test":**
> Would this photo get saved to a "kitchen ideas" board? If not, iterate.

---

## 10. Session Log Summary

| Session | Date | Work Completed | Gates Cleared | Next Actions |
|---------|------|----------------|---------------|--------------|
| 0 | 2026-01-09 | System initialization | None | Session 1: WS1, WS2, WS3 |

---

## Reference Documents

These existing documents inform agent work but are NOT authoritative:

- `public/notes/kitchen-bar-project-brief.md` - Original vision doc
- `public/notes/kitchen-bar-specs-updated.md` - Specs reference
- `public/notes/TODO-kitchen-bar.md` - Original TODO (superseded by this plan)
- `docs/research/2026-01-08-cabinet-options.md` - Cabinet research
- `docs/research/2026-01-08-butcher-block-sourcing.md` - Butcher block research
- `docs/research/2026-01-08-height-constraints.md` - Height math
- `visualization/jsx/kitchen-floor-cabinets-sketch.jsx` - Current visualization

---

*This document is the single source of truth for the Kitchen Bar project.*
*Last updated: 2026-01-09 by Orchestrator System Setup*
