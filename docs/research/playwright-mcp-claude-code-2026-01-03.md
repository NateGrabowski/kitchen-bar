# Playwright MCP + Claude Code: Research Summary

**Date:** 2026-01-03
**Query:** How to get Claude Code to work effectively with Playwright MCP for instant feedback and live results
**Sources consulted:** 12

---

## Executive Summary

Claude struggles with Playwright MCP for three documented reasons:

1. **`@playwright/mcp@latest` downloads an unstable beta** with tools that randomly stop working mid-session
2. **30+ tools overwhelm Claude's decision-making** — tool proliferation causes inconsistent behavior
3. **Accessibility snapshots bloat context** — each interaction adds thousands of tokens

**Recommendation:** Switch from Playwright MCP to the **playwright-skill** by lackeyjb. It's purpose-built for local dev testing and visual verification, solving all three problems.

---

## Key Findings

### 1. There is no @anthropic/mcp-playwright

The package you're likely using is `@playwright/mcp` from Microsoft. Anthropic doesn't maintain a separate Playwright MCP server.

### 2. The @latest tag is unstable

GitHub Issue #1383 documents that `@playwright/mcp@latest` downloads a buggy beta version where:
- Tools randomly become unavailable mid-session
- `browser_navigate`, `browser_snapshot` fail while `browser_type` works
- Complete tool disappearance after 10-15 minutes

**Fix:** Use `@executeautomation/playwright-mcp-server` instead (confirmed stable).

### 3. Skill approach beats MCP for local development

| Aspect | Playwright MCP | playwright-skill |
|--------|---------------|------------------|
| How it works | Claude calls 30+ browser tools | Claude writes Playwright code, executes it |
| Visible browser | Config flag needed | Default (headless: false) |
| Token efficiency | Poor (snapshots each call) | Good (progressive disclosure) |
| Stability | Beta issues documented | Stable (1.1K stars, maintained) |
| Best for | CI/CD automation | Local dev testing |

### 4. Headed mode configuration

For visible browser with MCP:
- Omit `--headless` flag from args
- Or set ENV: `PLAYWRIGHT_BROWSER_HEADLESS=false`

The playwright-skill uses `headless: false` by default.

### 5. Best practices for effective usage

1. **Explore before generating** — Let Claude navigate first
2. **Prefer snapshots over screenshots** — Better token efficiency
3. **Give Claude a testing persona** — Specific rules improve behavior
4. **Restrict to browser-only tools** — Prevents "cheating" via source code
5. **Test multiple viewports** — Include mobile (375x667)

---

## Recommended Setup

### Option A: Fix MCP (if you prefer MCP approach)

```bash
# Remove buggy version
claude mcp remove playwright

# Install stable version
claude mcp add playwright npx @executeautomation/playwright-mcp-server
```

### Option B: Use playwright-skill (recommended)

```bash
/plugin marketplace add lackeyjb/playwright-skill
/plugin install playwright-skill@playwright-skill
```

Or manually:
```bash
git clone https://github.com/lackeyjb/playwright-skill.git
cp -r playwright-skill/skills/playwright-skill ~/.claude/skills/
cd ~/.claude/skills/playwright-skill && npm run setup
```

---

## Limitations

- Neither approach replaces unit tests
- Auth flows require manual credential entry
- Skill requires local Node.js + Playwright installation

---

## Sources

### Primary Sources

1. **Using Playwright MCP with Claude Code** — Simon Willison (Jul 2025)
   URL: https://til.simonwillison.net/claude-code/playwright-mcp-claude-code
   Key contribution: Basic setup guide, visible browser configuration

2. **microsoft/playwright-mcp** — Microsoft (Active)
   URL: https://github.com/microsoft/playwright-mcp
   Stars: 25,035 | Forks: 2,036 | Last commit: 2025-12-31
   Key contribution: Official MCP server documentation, 30+ tools reference

3. **Building an AI QA Engineer with Claude Code and Playwright MCP** — alexop.dev (Dec 2025)
   URL: https://alexop.dev/posts/building_ai_qa_engineer_claude_code_playwright/
   Key contribution: Persona approach, tool restriction strategy, best practices

4. **The Ultimate Guide to Playwright MCP** — TestDino (Dec 2025)
   URL: https://testdino.com/blog/playwright-mcp/
   Key contribution: 7 best practices, explore-before-generate philosophy

5. **lackeyjb/playwright-skill** — Bryan Lackey (Active)
   URL: https://github.com/lackeyjb/playwright-skill
   Stars: 1,101 | Forks: 49 | Last commit: 2025-12-19
   Key contribution: Skill-based alternative, token-efficient approach

6. **[BUG] Playwright MCP frequently fails** — GitHub Issue #1383 (May 2025)
   URL: https://github.com/anthropics/claude-code/issues/1383
   Key contribution: Root cause of instability, stable alternative identified

### Secondary Sources

7. **HN: Playwright Skill for Claude Code** (Oct 2025)
   URL: https://news.ycombinator.com/item?id=45642911
   Key contribution: Token consumption problem explanation

8. **Running MCPs with visible browser** — Latenode Forum (Aug 2025)
   URL: https://community.latenode.com/t/running-mcps-with-visible-browser-instead-of-headless-mode/33790
   Key contribution: ENV variable workaround for headed mode

9. **Playwright MCP Setup Guide** — Sameer Khan (Dec 2025)
   URL: https://www.sameerkhan.me/blog/playwright-mcp-claude-code-browser-automation
   Key contribution: Practical usage tips, snapshot vs screenshot advice

### Sources Evaluated but Flagged (Lower Authority)

10. Reddit r/ClaudeAI speed discussion — Community anecdotes
11. Reddit r/ClaudeCode screenshots context — Token bloat concerns
12. ExecuteAutomation MCP — Referenced in Issue #1383 as stable alternative

---

## Research Metadata

- **Phases completed:** 7/7
- **Serper queries:** 6
- **WebSearch calls:** 0
- **Sources extracted:** 12
- **Sources accepted:** 9
- **Sources flagged:** 3
