# SESSION 6 DIRECTIVE - LOCKED

**Created:** 2026-01-10
**Source:** Human initial prompt
**Status:** ACTIVE - DO NOT DEVIATE

---

## CORE COMPLAINT (What was wrong)

1. **Scattered files** - Living Room Panel is a separate file, not integrated
2. **ASCII diagrams in code blocks** - UNACCEPTABLE (```...``` workarounds)
3. **Markdown is NOT a publication** - Can't print it, can't use it in workshop
4. **Diagrams are poor quality** - No research on what good diagrams look like
5. **Orchestrator didn't pivot** - Kept accepting bad output instead of changing approach

---

## CORE DIRECTIVE (What must happen)

> "This absolutely is not ready to be done. This is not even close to a 'publication'."

**The output must be:**
- A REAL publication (PDF, website, or artifact - NOT markdown)
- Consolidated single document (not scattered files)
- Real diagrams (not ASCII, not code blocks)
- Professional quality (researched best practices)

**Orchestrator authority granted:**
> "You are in charge. You can do whatever is necessary to get this done."

---

## RESEARCH COMPLETED

| Finding | Source |
|---------|--------|
| PDF is industry standard for woodworking plans | AWI QCP, Popular Woodworking |
| Plans must "answer every question before shop floor" | AWI Standards |
| Step-by-step with diagrams at EACH step | Ana White format |
| Dimensions ON diagrams, not in text | Professional standard |

**Decision Made:** PDF is the output format.

---

## WHAT WE HAVE

| Asset | Status | Location |
|-------|--------|----------|
| Build Manual content | Complete (63KB) | `ws9-build-manual/BUILD-MANUAL.md` |
| Living Room Panel chapter | Separate file (BAD) | `ws9-build-manual/LIVING-ROOM-PANEL-CHAPTER.md` |
| 4 SVG diagrams | Created but not integrated | `ws9-build-manual/diagrams/*.svg` |
| JSX visualizations | Exist | `visualization/jsx/*.jsx` |

---

## WHAT MUST BE CREATED

1. **Single consolidated HTML/PDF document**
   - All chapters merged (including Living Room Panel in correct sequence)
   - Proper visual hierarchy
   - Print-ready layout

2. **Real diagrams embedded**
   - Replace ALL ASCII code blocks with proper graphics
   - SVGs rendered or converted to images
   - Dimensions called out ON diagrams

3. **Professional publication**
   - Title page
   - Table of contents
   - Chapter headers
   - Page numbers
   - Print-optimized

---

## EXECUTION PLAN

### Phase 1: Content Consolidation
- [ ] Merge Living Room Panel into BUILD-MANUAL at correct position (after Chapter 5)
- [ ] Identify ALL ASCII diagrams that need replacement
- [ ] Create list of required diagrams

### Phase 2: Diagram Creation
- [ ] Convert existing SVGs to embeddable format
- [ ] Create new diagrams for ASCII replacements
- [ ] Render JSX visualizations to images

### Phase 3: Publication Generation
- [ ] Create styled HTML with all content
- [ ] Embed all diagrams
- [ ] Convert to PDF
- [ ] Validate print quality

### Phase 4: Quality Check
- [ ] No ASCII diagrams remain
- [ ] No code blocks for visuals
- [ ] All chapters integrated
- [ ] Professional appearance
- [ ] Printable

---

## ORCHESTRATOR RULES FOR THIS SESSION

1. **If confused:** Read this file (`SESSION-6-DIRECTIVE.md`)
2. **If output looks like markdown with code blocks:** REJECT and redo
3. **If creating separate files instead of consolidated:** STOP and consolidate
4. **If context getting long:** Checkpoint to `state.json` and continue
5. **Success criteria:** A single PDF file that could be printed and used in a workshop

---

## CHECKPOINTS

After each phase, update:
- `.orchestrator/state.json` with progress
- This file with phase completion status

---

*This directive is the source of truth for Session 6.*
