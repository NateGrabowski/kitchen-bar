# WS3: Construction Techniques Validation Checklist

**Minimum Passing Score:** 48/50 (96%)

---

## Scoring Criteria (10 points each)

### 1. Tutorial Research (0-10)
- [ ] 3-5 quality tutorials summarized
- [ ] Text-based guides prioritized (not video-dependent)
- [ ] For videos: titles and key takeaways listed
- [ ] Sources are reputable (Fine Woodworking, This Old House, proven DIY channels)

**Score: ___/10**

### 2. Joinery Decision (0-10)
- [ ] Technique comparison completed (pocket hole vs dado vs other)
- [ ] Clear recommendation with reasoning
- [ ] Joinery method LOCKED and documented
- [ ] Pros/cons for this specific project explained

**Score: ___/10**

### 3. Tool Requirements (0-10)
- [ ] Complete tool list provided
- [ ] "Must have" vs "Nice to have" clearly separated
- [ ] Rental vs purchase recommendations
- [ ] Specific models/brands suggested where helpful

**Score: ___/10**

### 4. Build Sequence (0-10)
- [ ] Order of operations defined
- [ ] Clear sequence: base → boxes → face frame → finish → doors → mount → top
- [ ] Decision points noted (finish before or after assembly?)
- [ ] Mounting method specified (wall, floor, leveling approach)

**Score: ___/10**

### 5. DIY Accessibility (0-10)
- [ ] Cheat sheet of pro tips included
- [ ] Common failure points identified with prevention
- [ ] Assumes competent DIYer (furniture experience, not cabinet experience)
- [ ] Time estimates per major phase
- [ ] Could hand to someone and they'd succeed

**Score: ___/10**

---

## Required Artifacts Checklist

- [ ] `docs/agent-outputs/ws3-construction/tutorial-summaries/` contains summaries
- [ ] `docs/agent-outputs/ws3-construction/technique-comparison.md` exists
- [ ] `docs/agent-outputs/ws3-construction/tool-list.md` exists
- [ ] `docs/agent-outputs/ws3-construction/BUILD-SEQUENCE.md` exists
- [ ] `docs/agent-outputs/ws3-construction/pro-tips.md` exists

---

## Auto-Reject Triggers (Instant Fail)

- [ ] Fewer than 3 tutorials summarized
- [ ] No joinery method recommended
- [ ] Says "watch these videos" without text summaries
- [ ] No build sequence provided
- [ ] Tool list missing or vague ("you'll need clamps")

---

## Final Score

| Criterion | Score |
|-----------|-------|
| Tutorial Research | /10 |
| Joinery Decision | /10 |
| Tool Requirements | /10 |
| Build Sequence | /10 |
| DIY Accessibility | /10 |
| **TOTAL** | **/50** |

**Pass:** Score >= 48 AND no auto-reject triggers
**Result:** [ ] PASS / [ ] FAIL - ITERATE
