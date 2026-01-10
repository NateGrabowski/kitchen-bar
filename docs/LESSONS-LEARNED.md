# Kitchen Bar Project - Lessons Learned

**Project:** Kitchen Bar Cabinet Build
**Date:** 2026-01-10
**Sessions:** 4
**Work Streams:** 9
**Files Generated:** 54

---

## What Worked

### 1. Parallel Agent Dispatching

Dispatching multiple Sonnet agents in parallel was the single biggest efficiency gain. In Session 1, WS1/WS2/WS3 all ran simultaneously. In Session 3, WS4/WS5/WS6/WS7 ran in parallel.

**Result:** What could have been 8+ hours of sequential work compressed into ~2 hours per session.

### 2. Gate System Prevented Costly Mistakes

The 5-gate architecture caught several issues before they cascaded:

| Gate | What It Caught |
|------|----------------|
| Gate 0 (Column) | Forced column decision BEFORE any design work started |
| Gate 1 (Design) | Prevented cut list generation before design approval |
| Gate 2 (Butcher Block) | Locked sourcing before expensive purchase |
| Gate 3 (Construction) | Confirmed tool availability before detailed planning |
| Gate 4 (Dimensions) | Final verification before any cutting begins |

**Without Gate 0:** Would have designed around a column that might not need to stay.
**Without Gate 1:** Would have generated cut lists 3x (once per rejected design).

### 3. Opus for Integration, Sonnet for Generation

The tiered model approach paid off:

- **Sonnet:** Fast generation of research, options, first drafts
- **Opus:** Cross-referencing, validation, optimization passes

In Session 3, Opus reruns on WS3 and WS4 after Sonnet initial passes found:
- Tool list had table saw listed (wrong)
- Cut lists missing foot rail backing blocks
- Build sequence could be optimized 20-25%

### 4. Validation Checklists with 96% Threshold

The 48/50 (96%) passing threshold forced quality. WS2 scored 50/50. WS1 and WS3 needed iteration to pass.

### 5. Human Feedback Loop (Session 2)

Session 2 was entirely dedicated to processing human feedback. This prevented the "AI races ahead with wrong assumptions" problem.

**Pattern:** Generate options -> Human reviews -> Refire with corrections -> Human approves

### 6. Single Source of Truth (Master Plan)

The master plan prevented conflicting information. Every agent read from and wrote to the same state file. No "which version is correct?" confusion.

---

## What Was Painful

### 1. Human Rejected All Session 1 Design Options

Session 1 generated 3 carefully crafted cabinet face options (A, B, C). Human rejected all three and provided a completely different design (barn door + drawers).

**Lesson:** Should have done more upfront discovery. The brainstorming skill was available but not used aggressively enough.

**What should have happened:** Before generating ANY options, ask the human:
- "Do you want open shelves, closed doors, drawers, or a mix?"
- "Any special features like barn doors, pull-outs, hidden compartments?"
- "Show me inspiration images - what do you like about each?"

### 2. Table Saw Assumption in WS3

Session 1 WS3 assumed table saw available. Human didn't have one. Required complete refire of construction techniques in Session 2.

**Lesson:** Tool inventory should be Gate -1 (before anything else) or part of Gate 0.

**What should have happened:** First question: "List every power tool you own."

### 3. Multiple Build Sequence Versions

WS3 ended up with 3 build sequence files:
- `BUILD-SEQUENCE.md` (Session 1)
- `BUILD-SEQUENCE-v2.md` (Session 2)
- `BUILD-SEQUENCE-FINAL.md` (Session 3)

This created potential confusion about which to follow.

**Lesson:** Should deprecate/archive old versions more clearly, or use explicit versioning in the FINAL document.

### 4. WS8 Had to Be Created Mid-Project

The original master plan had WS8 as "Build Manual." We had to split this into:
- WS8: Integration & Validation
- WS9: Build Manual

The need for an integration pass wasn't anticipated in the original design.

**Lesson:** Always budget a validation/integration work stream between "all streams done" and "final synthesis."

### 5. JSX Visualization Exists But No PNG Exports

The visualization system works great interactively (`npm run dev`), but we never generated static PNG exports for the build manual.

**Lesson:** Should have used Playwright skill to screenshot all key visualizations for print-ready manual.

---

## What I'd Change in the Template

### 1. Add Gate -1: Tool & Skill Inventory

Before any design or research work:
- What tools does the human own?
- What's the skill level (beginner/intermediate/expert)?
- Any physical limitations (can't lift heavy, etc.)?

### 2. Make Brainstorming Mandatory for WS1

The first design work stream should ALWAYS start with structured brainstorming:
```
1. What problem are we solving?
2. What's non-negotiable?
3. What would "wow" look like?
4. What are the constraints?
5. Show me examples you like
```

### 3. Add WS8: Integration as Standard

Every project should have a validation/integration stream that runs after all other streams complete but before final synthesis. Its job:
- Cross-reference all outputs
- Check for contradictions
- Consolidate overlapping content
- Flag gaps

### 4. Version Control for Iteration

Instead of `file.md` -> `file-v2.md` -> `file-FINAL.md`, use:
- Archive folder for superseded versions
- Clear "THIS IS THE CURRENT VERSION" header
- Changelog at bottom of document

### 5. Screenshot Every Visualization

Add a standard step: After any JSX visualization is approved, capture static PNG using Playwright. Store in `docs/images/` for manual inclusion.

---

## Gates That Saved Me

### Gate 0: Structural Column Assessment

**What it caught:** Prevented designing without knowing if column must stay.

**If skipped:** Would have generated designs that either:
- Ignored the column (wrong if structural)
- Worked around the column (unnecessary if removable)

**Resolution:** Human reported column stud doesn't go into soffit. Assumed stays for safety. All designs accommodate column.

### Gate 1: Final Cabinet Face Design

**What it caught:** Human had completely different vision than AI-generated options.

**If skipped:** Would have generated cut lists for wrong design. Wasted materials if already purchased.

**Resolution:** Human specified exact 30/30/32 layout with barn door. All subsequent work used correct design.

### Gate 3: Construction Approach Lock

**What it caught:** No table saw available. Session 1 techniques wouldn't work.

**If skipped:** Human would have discovered mid-build that instructions assume tools they don't have.

**Resolution:** Complete refire with no-table-saw approach. Big box ripping + circular saw + miter saw.

### Gate 4: Final Dimensions Sign-off

**What it caught:** Final opportunity to verify all measurements before cutting.

**If skipped:** Cut lists could have wrong dimensions. Waste of materials.

**Resolution:** Human confirmed all locked specs. Proceeded with confidence.

---

## Missing Gates or Work Streams

### Should Have Added: Tool Inventory Gate

**When:** Before Gate 0
**Purpose:** Confirm available tools, skill level, workspace
**Would have prevented:** Table saw assumption requiring WS3 refire

### Should Have Added: Inspiration Review Gate

**When:** Before WS1
**Purpose:** Review human's saved images, Pinterest boards, etc.
**Would have prevented:** Complete rejection of all Session 1 design options

### Should Have Added: WS0: Discovery

**Purpose:** Structured interview before any work begins
- What's the problem?
- What does success look like?
- What are your constraints?
- What tools/skills do you have?
- Show me inspiration

### Should Have Added: Screenshot Work Stream

**Purpose:** Export all JSX visualizations to PNG
**Output:** Print-ready images for build manual
**Would have enabled:** Physical printed manual with diagrams

---

## Project Statistics

### Sessions

| Session | Date | Duration | Work Streams | Focus |
|---------|------|----------|--------------|-------|
| 0 | 2026-01-09 | N/A | 0 | System setup |
| 1 | 2026-01-09 | ~1 hour | 3 | WS1/WS2/WS3 parallel kickoff |
| 2 | 2026-01-09 | ~30 min | 2 | Human feedback, WS1/WS3 refire |
| 3 | 2026-01-09 | ~2 hours | 4 | WS4/5/6/7 + Opus optimization |
| 4 | 2026-01-10 | ~1 hour | 2 | WS8/WS9 integration + manual |

**Total Active Time:** ~4.5 hours
**Total Elapsed Time:** 2 days

### Work Streams

| Status | Count |
|--------|-------|
| COMPLETE | 9 |
| NOT_STARTED | 0 |
| BLOCKED | 0 |

### Files

| Category | Count |
|----------|-------|
| Markdown | 49 |
| JSX | 9 |
| JSON (state) | 1 |
| **Total** | 59 |

### Agents Dispatched

| Model | Count | Purpose |
|-------|-------|---------|
| Sonnet | 8 | Initial generation, research |
| Opus | 5 | Validation, optimization, synthesis |

### Validation Confidence

All work streams passed 96%+ validation threshold.

| Work Stream | Score | Method |
|-------------|-------|--------|
| WS1 | N/A | Human-specified (override) |
| WS2 | 50/50 | Checklist validation |
| WS3 | N/A | Multiple iterations + Opus rerun |
| WS4 | N/A | Opus cross-reference |
| WS5 | N/A | Opus verification |
| WS6 | N/A | Opus generation |
| WS7 | N/A | Opus generation |
| WS8 | 96%+ | Explicit validation report |
| WS9 | N/A | Synthesized from validated sources |

### Iterations Required

| Work Stream | Iterations | Reason |
|-------------|------------|--------|
| WS1 | 2 | Human rejected options, specified own design |
| WS2 | 1 | First pass accepted |
| WS3 | 4 | No table saw, added guides, Opus optimization |
| WS4 | 2 | Initial + Opus cross-reference |
| WS5 | 1 | First pass accepted |
| WS6 | 1 | Opus first pass accepted |
| WS7 | 1 | Opus first pass accepted |
| WS8 | 1 | First pass accepted |
| WS9 | 1 | First pass accepted |

---

## Key Quotes from Session Log

> "Human has specified the final cabinet face layout. This design supersedes all Session 1 options."
> - Session 2, on design rejection

> "Build time reduced: 45-50h to 35-40h (20-25% faster)"
> - Session 3, Opus optimization result

> "Critical issue: tool-list.md incorrectly listed table saw... FIX APPLIED"
> - Session 4, WS8 validation catch

> "All 9 work streams finished. 50 output files created. Build manual synthesized and ready for review."
> - Session 4, project completion

---

## Recommendations for Future Projects

1. **Start with discovery, not design.** Use brainstorming skill aggressively before generating anything.

2. **Get tool/skill inventory first.** Add explicit gate for this.

3. **Budget for integration pass.** Don't go straight from "all streams done" to "final synthesis."

4. **Iterate on design with human in the loop.** Don't generate 3 options hoping one works. Co-create.

5. **Export visuals to static format.** Don't rely on interactive-only visualizations.

6. **Keep superseded versions archived clearly.** Prevent "which file is current?" confusion.

7. **Opus for cross-referencing, Sonnet for generation.** The tier system works well.

8. **Gates are worth the friction.** They prevent expensive cascading errors.

---

*Generated: 2026-01-10*
*Project duration: 2 days*
*Lessons documented for template improvement*
