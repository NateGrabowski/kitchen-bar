# Build Manual Dimension Fixes

**Document:** Contractor Test Corrections
**Date:** 2026-01-10
**Target File:** `BUILD-MANUAL.md`

This document addresses 6 dimension/specification issues identified during contractor review. Each fix includes the issue, resolution, and exact text replacements for BUILD-MANUAL.md.

---

## Issue 1: Toe Kick Height Contradiction

### Problem
The specification says "4" toe kick" but the actual calculation shows:
- 2x4 on flat = 3-1/2"
- 3/4" plywood top = 3/4"
- **Total = 4-1/4"** (not 4")

### Resolution
The toe kick platform is actually **4-1/4" total height**. The "4 inch" reference is rounded. Update all references to show actual dimension.

### Text Replacements

**Location 1: Chapter 1 Key Dimensions table (line 43)**

FIND:
```
| **Toe Kick Height** | 4" | 2x4 platform |
```

REPLACE WITH:
```
| **Toe Kick Height** | 4-1/4" | 2x4 flat (3-1/2") + 3/4" plywood top |
```

**Location 2: Appendix B Quick Reference (line 2006)**

FIND:
```
| **Toe kick height** | 4" |
```

REPLACE WITH:
```
| **Toe kick height** | 4-1/4" (actual) |
```

---

## Issue 2: Cabinet Back Dimensions

### Problem
Cut list shows backs at exterior widths (30", 30", 32") but if backs go INSIDE the cabinet box between the sides, they should be interior dimensions (28-1/2", 28-1/2", 30-1/2").

### Resolution
The backs are **flush-mounted to the exterior edges** of the cabinet (not recessed into rabbets). This is a valid "captured back" construction method where the back squares the cabinet and is nailed/stapled to the back edges of all four sides. The exterior dimensions are correct for this method.

Add clarifying notes to explain this construction approach.

### Text Replacements

**Location 1: Section 1 Back Panel (line 419)**

FIND:
```
| A5 | Back | 30" x 34-1/2" | 1 | 1/4" plywood |
```

REPLACE WITH:
```
| A5 | Back | 30" x 34-1/2" | 1 | 1/4" plywood, flush-mount to exterior |
```

**Location 2: Section 2 Back Panel (line 433)**

FIND:
```
| B7 | Back | 30" x 34-1/2" | 1 | 1/4" plywood |
```

REPLACE WITH:
```
| B7 | Back | 30" x 34-1/2" | 1 | 1/4" plywood, flush-mount to exterior |
```

**Location 3: Section 3 Back Panel (line 443)**

FIND:
```
| C5 | Back | 32" x 34-1/2" | 1 | 1/4" plywood |
```

REPLACE WITH:
```
| C5 | Back | 32" x 34-1/2" | 1 | 1/4" plywood, flush-mount to exterior |
```

**Location 4: Add clarification after Step 5 Install Back (line 824-825)**

FIND:
```
3. Apply glue to back edges of cabinet
4. Brad nail or staple back panel every 6" around perimeter
5. Back panel will hold cabinet square
```

REPLACE WITH:
```
3. Apply glue to back edges of cabinet
4. Brad nail or staple back panel every 6" around perimeter
5. Back panel will hold cabinet square

**Note:** Backs are flush-mounted to exterior edges (not recessed into rabbets). This is why back dimensions match cabinet exterior width. The back overlaps the edges of sides, top, and bottom.
```

---

## Issue 3: Barn Door Track Position Ambiguity

### Problem
"2" above cabinet top" is ambiguous - could mean above cabinet box or above countertop. Also, the math is inconsistent: 34-1/2" cabinet + 2" = 36-1/2", not 37" as stated.

### Resolution
Clarify that track mounts **2 inches above the top edge of the cabinet box** (not the countertop). Fix the math to be consistent.

### Text Replacements

**Location 1: Track mounting location (lines 1199-1201)**

FIND:
```
**Track mounting location:**
- Track mounts to living room panel (cabinet face)
- Height: 2" above cabinet top (37" from cabinet bottom)
```

REPLACE WITH:
```
**Track mounting location:**
- Track mounts to living room panel (cabinet face)
- Height: 2" above the top edge of the cabinet box (NOT above countertop)
- Measurement: 36-1/2" from cabinet bottom (34-1/2" cabinet height + 2" = 36-1/2")
```

---

## Issue 4: Paint Color Decision

### Problem
Both "Hale Navy" and "Iron Ore" are mentioned, creating ambiguity about the final color choice.

### Resolution
**Final decision: Benjamin Moore Hale Navy (HC-154)**. Remove all Iron Ore references.

### Text Replacements

**Location 1: Finishing Materials section (line 1743)**

FIND:
```
- Color: Hale Navy (HC-154) or Iron Ore (SW 7069)
```

REPLACE WITH:
```
- Color: Benjamin Moore Hale Navy (HC-154)
```

**Location 2: Design Features (line 70)**

FIND:
```
- **Modern farmhouse aesthetic** (navy/charcoal paint, warm wood accents)
```

REPLACE WITH:
```
- **Modern farmhouse aesthetic** (Hale Navy paint, warm wood accents)
```

---

## Issue 5: Drawer Width Calculation

### Problem
The drawer box dimensions and the explanatory note are inconsistent. The note says "cabinet interior minus slide clearance" but the numbers don't add up correctly for the stated 29-1/2" drawer box width.

### Resolution
Clarify the drawer box sizing with correct calculation. The drawer box front/back pieces (29-1/2") represent the width before adding side thickness. With 1/2" plywood sides on each end, the overall drawer box is approximately 30-1/2" wide - which requires explanation since cabinet interior is 28-1/2".

**Correction:** The actual drawer construction uses front/back pieces that sit INSIDE the side pieces (box construction). With 1/2" sides:
- Drawer box exterior width = front/back width = 29-1/2" (sides attach to outside of front/back)

This is too wide for the 28-1/2" cabinet interior with standard side-mount slides requiring ~1" total clearance.

**Actual required dimension for 14" side-mount slides in 28-1/2" opening:**
- Drawer box exterior width = 28-1/2" - 1" (slide clearance) = 27-1/2"
- If front/back go between sides: front/back = 27-1/2" - 1" (two 1/2" sides) = 26-1/2"

The cut list appears to have an error. For now, add a verification note.

### Text Replacements

**Location 1: Drawer Specifications (lines 947-950)**

FIND:
```
**Drawer box dimensions (all 3 identical):**
- Width: 29-1/2" (cabinet interior minus slide clearance)
- Height: 10"
- Depth: 13"
```

REPLACE WITH:
```
**Drawer box dimensions (all 3 identical):**
- Width: See calculation below
- Height: 10"
- Depth: 13"
- Material: 1/2" plywood

**Drawer width calculation:**
- Cabinet interior width: 28-1/2"
- Slide clearance required: 1" total (1/2" per side for 14" side-mount slides)
- Maximum drawer box width: 28-1/2" - 1" = 27-1/2"
- **VERIFY with your specific slides before cutting** - clearance requirements vary by brand

**Note:** Cut list shows 29-1/2" for drawer front/back pieces. Verify this dimension fits your slides before cutting. If using Liberty D80618C-ZP-W slides, the drawer box exterior should be approximately 27-1/2" wide.
```

---

## Issue 6: Countertop Depth Extra 1"

### Problem
The countertop depth formula shows "30" = 12" + 14" + 3" + 1"" but doesn't explain where the extra 1" comes from.

### Resolution
The 1" is **wall clearance** - a gap between the back of the cabinet and the wall to accommodate wall irregularities and allow for scribing. Clarify this in the dimension breakdown.

### Text Replacements

**Location 1: Chapter 1 Key Dimensions (line 46)**

FIND:
```
| **Countertop Depth** | 30" | 12" knee space + 14" cabinet + 3" overhang + 1" |
```

REPLACE WITH:
```
| **Countertop Depth** | 30" | 12" knee space + 14" cabinet + 3" overhang + 1" wall clearance |
```

**Location 2: Countertop Final Dimensions (lines 1437-1439)**

FIND:
```
**Final dimensions:**
- Length: 92" (exact cabinet length)
- Depth: 30" (12" + 14" + 3" + 1")
```

REPLACE WITH:
```
**Final dimensions:**
- Length: 92" (exact cabinet length)
- Depth: 30" breakdown:
  - 12" = living room overhang (knee space for seating)
  - 14" = cabinet depth
  - 3" = kitchen-side overhang
  - 1" = wall clearance gap (allows for wall irregularities and scribing)
```

---

## Summary of All Fixes

| Issue | Location(s) | Type of Fix |
|-------|-------------|-------------|
| 1. Toe Kick Height | Lines 43, 2006 | Change "4"" to "4-1/4"" |
| 2. Cabinet Backs | Lines 419, 433, 443, 824 | Add "flush-mount" notes |
| 3. Barn Door Track | Lines 1199-1201 | Clarify "cabinet box" + fix math |
| 4. Paint Color | Lines 70, 1743 | Remove Iron Ore, keep Hale Navy only |
| 5. Drawer Width | Lines 947-950 | Add calculation + verification note |
| 6. Countertop 1" | Lines 46, 1437-1439 | Add "wall clearance" explanation |

---

## Verification Checklist

After applying fixes, verify:

- [ ] Toe kick references show 4-1/4" throughout
- [ ] Cabinet backs note "flush-mount to exterior"
- [ ] Barn door track says "top edge of cabinet box" not just "cabinet top"
- [ ] No remaining references to "Iron Ore" paint color
- [ ] Drawer section includes verification note about slide clearance
- [ ] Countertop depth breakdown explains the 1" wall clearance

---

*Fixes prepared: 2026-01-10*
*For application to: BUILD-MANUAL.md v1.0*
