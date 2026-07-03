Monorepo layout

- apps/
  - myapp/     # your SvelteKit app (can be moved here)
- packages/
  - ui/        # shared component library (this workspace)

Quick steps to convert the existing project into the monorepo structure:

1. Move the current app files into `apps/myapp/` (preserve package.json and adjust paths).
2. Run `pnpm install` at the repo root.
3. From root, run `pnpm dev:app` to start the app.

Notes:
- A minimal `packages/ui` is provided with a `Button` component. Import it in your app once the workspace is set up:

  import { Button } from '@myorg/ui';

You may need to adjust build tooling for SvelteKit apps inside workspaces (Vite, tsconfig paths, etc.).
