# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build system or package manager. To run locally, use any static HTTP server:

```
python -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000`. There is no lint, test, or build step — development is edit → save → refresh.

Deployment is automatic: pushing to `main` triggers the GitHub Actions workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) which publishes the entire repo root to GitHub Pages at `https://sharrentoh-collab.github.io/claudeassessment/`. Because the whole root is served, avoid placing files with sensitive content there.

## Architecture

Single-file vanilla JS app ([index.html](index.html), [script.js](script.js), [styles.css](styles.css)) with no dependencies.

**Screen model:** Two screens (`menu` and `game`) toggled via the `.hidden` CSS class. The `currentGame` global variable tracks active state.

**Game loop pattern:** Each game follows the same cycle:
1. A `generate*()` function creates a random question and sets `correctAnswer`
2. Answer buttons are rendered/updated and compared in `checkAnswer()`
3. CSS animations (`bounce` for correct, `shake` for wrong) give feedback; `setTimeout` chains to the next question
4. Correct answers announce via `#feedback-live` (`aria-live="polite"`) and spawn confetti stars

**Two button listener patterns — important distinction:**
- **Static buttons** (count, color, letter games): `<button class="option-btn">` elements exist in the HTML; listeners are attached once at `DOMContentLoaded` and read `data-value` / `data-color` / `textContent`
- **Dynamic buttons** (shape, math, animal games): buttons are created fresh in each `generate*()` call via `innerHTML = ''` + `appendChild`; listeners are attached inside the generator, not at init

**Six games:**
- **Count the Apples** — renders N emoji apples (1–3), player picks the matching number
- **Color Match** — shows a colored bucket (inline CSS `color`), player picks the matching colored object
- **Find the Letter** — shows an uppercase letter, player picks the matching lowercase from 3 shuffled options
- **Shape Match** — shows a shape emoji, player picks the name (circle, diamond, square, triangle, star)
- **Simple Math** — shows `a + b = ?` (operands 1–3), player picks the sum
- **Animal Match** — shows an animal emoji, player picks the name from 8 possible animals

**State:** Only two globals — `currentGame` and `correctAnswer`. DOM elements are cached at load time (except dynamic game buttons).

**CSS design tokens:** All colours, shadows, and border-radii are defined as CSS custom properties on `:root` in [styles.css](styles.css). Edit tokens there rather than scattered hardcoded values.

## Custom Commands

`/gitpush` — stages and commits all changes, rewrites README.md to reflect the current app, takes a live-site screenshot with Playwright, and pushes everything to `main`. Defined in [.claude/commands/gitpush.md](.claude/commands/gitpush.md).

## Agent Skills

Three skills are installed under [.claude/skills/](.claude/skills/) and locked in [skills-lock.json](skills-lock.json):

| Skill | Source | Purpose |
|---|---|---|
| `frontend-design` | `anthropics/skills` | Design guidance for distinctive, production-grade UI |
| `web-design-guidelines` | `vercel-labs/agent-skills` | Audit UI files against accessibility and UX rules |
| `find-skills` | `vercel-labs/skills` | Discover available skills in the ecosystem |

To reinstall skills from the lock file: `npx skills install`
