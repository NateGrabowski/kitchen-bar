## Kitchen Bar Project — Orchestrated Build

This project uses an **agentic orchestrator system**. The master plan is the single source of truth.

### Start Here

**Master Plan:** `docs/plans/MASTER-kitchen-bar-agentic-plan.md`

To run the orchestrator:
> "Run the kitchen bar orchestrator"

The orchestrator will:
1. Read the master plan for current state
2. Dispatch parallel Sonnet agents for unblocked work streams
3. Apply 96% confidence rule before marking anything complete
4. Escalate only critical decisions (5 defined gates)
5. Update the master plan with session results

### Project Summary

Split-level kitchen bar replacing metal railing. Kitchen is 23.5" higher than living room. Seating on kitchen side, cabinets face living room. Modern farmhouse aesthetic.

**Locked Specs:** 92" length, 40" height, 14" cabinet depth, 30" counter depth, butcher block top

### Work Streams

| Stream | Focus |
|--------|-------|
| WS1 | Cabinet face design |
| WS2 | Butcher block sourcing |
| WS3 | Construction techniques |
| WS4 | Cut lists & materials |
| WS5 | Doors & drawers |
| WS6 | Finishing & aesthetics |
| WS7 | Electrical & features |
| WS8 | Build manual (capstone) |

### Key Locations

| What | Where |
|------|-------|
| Master plan | `docs/plans/MASTER-kitchen-bar-agentic-plan.md` |
| Agent outputs | `docs/agent-outputs/ws1-ws8/` |
| Session log | `docs/agent-outputs/SESSION-LOG.md` |
| Human notes | `docs/human-notes.md` |
| Visualizations | `visualization/jsx/` |
| Research (reference) | `docs/research/` |

### Running Visualizations

```bash
npm run dev
```
Opens at http://localhost:5173

### Playwright Screenshots

```bash
cd C:/Users/nateg/.claude/plugins/cache/playwright-skill/playwright-skill/4.1.0/skills/playwright-skill
node run.js /tmp/your-script.js
```

### Git Worktrees

```bash
git worktree add .worktrees/<branch-name> -b <branch-name>
```

### Skills the Orchestrator Uses

**Process:** `brainstorming`, `dispatching-parallel-agents`, `verification-before-completion`
**Research:** `deep-research`, `web-research`
**Documents:** `pdf`, `xlsx`, `frontend-design`, `canvas-design`
**Browser:** `playwright-skill`, `chrome:browsing`

See master plan Section 9 "Skills Integration" for full mapping.