# Preschool Fun Games

An interactive educational web app for young children featuring six colorful mini-games with emoji visuals and instant feedback.

**Live site:** https://sharrentoh-collab.github.io/claudeassessment/

![Preschool Fun Games](screenshot.png)

## Games

| Game | Description |
|------|-------------|
| Count the Apples | Count apple emojis and pick the matching number |
| Color Match | Match colored objects to the correct color name |
| Find the Letter | Identify the lowercase letter that matches an uppercase one |
| Shape Match | Identify shapes — circle, square, triangle, diamond, star |
| Simple Math | Basic addition problems up to 3+3 |
| Animal Match | Match animal emojis to their names |

## Running Locally

No build step required. Serve the files with any static HTTP server:

```bash
python -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000`.

## Deployment

Pushing to `main` automatically deploys to GitHub Pages via the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Tech Stack

Vanilla HTML, CSS, and JavaScript — no frameworks or dependencies.
