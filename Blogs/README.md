# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([

  # Cybersecurity Blog — My Journey

  This repository will host my personal blog where I document my journey learning and working in cybersecurity. Expect a mix of:

  - CTF write-ups and walkthroughs
  - Tooling notes and mini-guides
  - Vulnerability research and exploit write-ups (when safe to share)
  - Learning notes, resources, and lessons learned

  ## Where posts live

  Add new posts under `src/pages/blogs/` — each post can be a React page (`.tsx`) following the project's existing structure. If you prefer Markdown/MDX and want it supported, I can help add an MDX pipeline.

  ## Run the project locally

  Open PowerShell and run:

  ```powershell
  pnpm install
  pnpm dev
  ```

  The site runs with Vite for fast local development.

  ## Contributing / Adding posts

  - Create a new file in `src/pages/blogs/` named like `MyPostTitle.tsx` and export the component for that page.
  - Keep post content focused and include references or redactions for sensitive details when needed.

  If you want, I can add a simple post template or a script to scaffold new posts.

  ## Notes

  - This repo is a personal learning log — content may be experimental. Reach out via issues or a PR if you'd like to suggest edits.
