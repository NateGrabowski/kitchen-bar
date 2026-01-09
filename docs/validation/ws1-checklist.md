# WS1: Cabinet Face Design Validation Checklist

**Minimum Passing Score:** 48/50 (96%)

---

## Scoring Criteria (10 points each)

### 1. Completeness (0-10)
- [ ] Minimum 3 distinct layout options provided
- [ ] Each option is meaningfully different (not just color variations)
- [ ] All options respect locked dimensions (14" depth, 92" length, 40" height)

**Score: ___/10**

### 2. Visual Quality (0-10)
- [ ] Each option has a JSX render viewable in browser
- [ ] Renders show door/drawer/shelf configuration clearly
- [ ] Proportions are visible and measurable
- [ ] File exists: `docs/agent-outputs/ws1-cabinet-face/option-[A/B/C].jsx`

**Score: ___/10**

### 3. Dimensioning (0-10)
- [ ] All door sizes labeled with measurements (width x height)
- [ ] All drawer sizes labeled
- [ ] Shelf spacing specified
- [ ] Reveal/gap dimensions noted (typical: 1/8")

**Score: ___/10**

### 4. Comparison & Recommendation (0-10)
- [ ] Side-by-side comparison render exists
- [ ] File exists: `docs/agent-outputs/ws1-cabinet-face/comparison.png` or `.jsx`
- [ ] Clear recommendation with reasoning
- [ ] Reasoning addresses: proportion, balance, functionality, modern farmhouse aesthetic

**Score: ___/10**

### 5. Buildability (0-10)
- [ ] Designs account for column constraint (if must stay per Gate 0)
- [ ] All designs buildable with tools from WS3 (if WS3 complete)
- [ ] No impossible geometries (doors too wide, shelves too thin)
- [ ] Standard hardware sizes accommodated (hinges, slides)

**Score: ___/10**

---

## Required Artifacts Checklist

- [ ] `docs/agent-outputs/ws1-cabinet-face/option-A.jsx` exists
- [ ] `docs/agent-outputs/ws1-cabinet-face/option-B.jsx` exists
- [ ] `docs/agent-outputs/ws1-cabinet-face/option-C.jsx` exists
- [ ] `docs/agent-outputs/ws1-cabinet-face/comparison.png` OR `comparison.jsx` exists
- [ ] `docs/agent-outputs/ws1-cabinet-face/RECOMMENDATION.md` exists

---

## Auto-Reject Triggers (Instant Fail)

- [ ] Any option missing dimensions
- [ ] Fewer than 3 options
- [ ] No recommendation provided
- [ ] Recommendation lacks reasoning
- [ ] Designs violate locked specifications

---

## Final Score

| Criterion | Score |
|-----------|-------|
| Completeness | /10 |
| Visual Quality | /10 |
| Dimensioning | /10 |
| Comparison | /10 |
| Buildability | /10 |
| **TOTAL** | **/50** |

**Pass:** Score >= 48 AND no auto-reject triggers
**Result:** [ ] PASS / [ ] FAIL - ITERATE
