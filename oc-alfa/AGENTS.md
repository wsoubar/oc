# Repository Guidelines

## Project Structure & Module Organization

This is a React 19 application built with Vite.

- `src/main.jsx` bootstraps React and renders `App`.
- `src/App.jsx` contains the main UI and component behavior.
- `src/App.css` and `src/index.css` contain component and global styles.
- `src/assets/` stores assets imported by JavaScript or CSS.
- `public/` stores static files served from the site root, such as SVG sprites.
- `index.html` is the Vite HTML entry point. Build output is generated in `dist/` and should not be committed.

## Build, Test, and Development Commands

Run commands from the repository root after installing dependencies with `npm install`:

- `npm run dev` starts the Vite development server with hot module replacement.
- `npm run build` creates the production bundle in `dist/`.
- `npm run lint` runs Oxlint using `.oxlintrc.json` and its React rules.
- `npm run preview` serves the built bundle locally; run `npm run build` first.

There is no test framework or `npm test` script configured. For UI changes, run the linter and production build, then manually check the affected flow.

## Coding Style & Naming Conventions

Use modern JavaScript and JSX with two-space indentation, single quotes, and semicolon-free statements, matching the existing files. Name React components in PascalCase (`App.jsx`), functions and variables in camelCase, and CSS classes in kebab-case or the established project style. Keep images in `src/assets/` or `public/` according to whether they are imported or root-served. Keep hooks at the top level and address Oxlint warnings before submitting changes.

## Testing Guidelines

No automated tests or coverage thresholds exist yet. When adding behavior that warrants tests, introduce a React testing setup and an `npm test` script; keep tests near the feature or in `src/__tests__/`. Until then, validate with `npm run lint`, `npm run build`, and a manual browser check.

## Commit & Pull Request Guidelines

This checkout has no Git history, so no repository-specific commit convention can be inferred. Use concise imperative subjects, such as `Improve hero section accessibility`. Pull requests should explain the change, list validation commands, link any relevant issue, and include screenshots for visual changes.

## Security & Configuration Tips

Do not commit secrets or local environment files. Keep generated output, dependencies, and editor files ignored by `.gitignore`. External links opened in new tabs should retain appropriate security attributes when they are changed or added.
