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

Deployment is automatic: pushing to `main` triggers the GitHub Actions workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) which publishes to GitHub Pages at `https://sharrentoh-collab.github.io/claudeassessment/`.

## Architecture

Single-file vanilla JS app ([index.html](index.html), [script.js](script.js), [styles.css](styles.css)) with no dependencies.

**Screen model:** Two screens (`menu` and `game`) toggled via the `.hidden` CSS class. The `currentGame` global variable tracks active state.

**Game loop pattern:** Each game follows the same cycle:
1. A `generate*()` function creates a random question and sets `correctAnswer`
2. Buttons are rendered with `data-*` attributes encoding the answer value
3. `checkAnswer()` reads the clicked button's data attribute and compares to `correctAnswer`
4. CSS animations (`bounce` for correct, `shake` for wrong) give feedback, then a `setTimeout` chains to the next question

**Three games:**
- **Count the Apples** — renders N emoji apples, player picks the matching number
- **Color Match** — shows a colored bucket (set via inline CSS `color` property), player picks the color name
- **Find the Letter** — shows a target letter, player picks from shuffled options including the match

**State:** Only two globals — `currentGame` and `correctAnswer`. DOM elements are cached at load time.

**Confetti:** Correct answers spawn star emoji nodes into the DOM via `setTimeout`-chained creation; they fade out and are removed after their animation completes.
