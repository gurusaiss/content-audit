# Content Quality Audit

## URL : https://ai-content-prism.lovable.app/

A modern Vite + React + TypeScript app with Tailwind CSS and shadcn-ui. Run locally, build, and deploy to GitHub Pages.

## Features

- Fast Vite dev server and build
- React + TypeScript UI with shadcn-ui components
- Tailwind CSS styling
- Ready-to-use GitHub Pages deployment workflow

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

## Prerequisites

- Node.js 18+ (recommend 20) and npm
- Git

## Clone and setup

```bash
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
cd <YOUR_REPO>
npm ci
```

If you see "nmp not recognized", you likely misspelled `npm`.

## Run locally

```bash
npm run dev
```

Then open: http://localhost:8080

## Build and preview locally

```bash
npm run build
npm run preview
```

## Environment variables (optional)

Create a `.env` file if you add integrations. Example:

```ini
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy-gh-pages.yml` to build and deploy on push to `main`.

1. In GitHub, go to Settings → Pages → set Source to “GitHub Actions”.
2. Push to `main` to trigger the workflow.
3. Find the public URL in Actions → latest “Deploy to GitHub Pages” (look for `page_url`) or in Settings → Pages.

URL format: `https://<USERNAME>.github.io/<REPO>/`

## Troubleshooting

- Ensure Node 18+ (prefer 20) with `node -v` and `npm -v`.
- If install fails on Windows with EPERM:
  - Close terminals, then run:
    ```powershell
    Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json; npm cache clean --force; npm install
    ```
- If the Pages workflow fails:
  - Check Actions logs for the failing step (Install, Build, Upload, Deploy).
  - Confirm workflow file exists at `.github/workflows/deploy-gh-pages.yml`.

## License

Add your license here (e.g., MIT).