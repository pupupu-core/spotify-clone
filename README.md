# Angular Nest Monorepo Starter

Nx monorepo with:

- `apps/web` - Angular SPA
- `apps/api` - NestJS backend
- `packages/shared/model` - shared public API contracts
- `packages/shared/utils` - shared pure utilities
- `packages/shared/config` - shared constants/config

More structure notes: [docs/architecture.md](/mnt/secure/@home/dashweb/dev/courses/rs/frontend/angular-2026q2/angular-spotify-v2/docs/architecture.md)

## Run

Install dependencies:

```bash
pnpm install
```

Run frontend + backend:

```bash
pnpm dev
```

Run only backend:

```bash
pnpm serve:backend
```

Run only frontend:

```bash
pnpm serve:frontend
```

## Checks

```bash
pnpm format:check
pnpm lint
pnpm stylelint:web
pnpm typecheck
```

Auto-fix where supported:

```bash
pnpm format
pnpm lint:fix
pnpm stylelint:web:fix
```

## Top Level Structure

```text
apps/
  web/
  api/

packages/
  shared/
    model/
    utils/
    config/
```

## Generate

Angular:

```bash
pnpm exec nx g @nx/angular:component apps/web/src/app/features/player/player-page
pnpm exec nx g @nx/angular:service apps/web/src/app/core/services/entity --skipTests
pnpm exec nx g @nx/angular:lib apps/web/src/app/shared/ui
```

Nest:

```bash
pnpm exec nx g @nx/nest:module apps/api/src/app/gateway/rest/v1/entity/entity
pnpm exec nx g @nx/nest:controller apps/api/src/app/gateway/rest/v1/entity/entity --unitTestRunner=none
pnpm exec nx g @nx/nest:service apps/api/src/app/infrastructure/storage/audio-storage/audio-storage --unitTestRunner=none
```

Shared TypeScript lib:

```bash
pnpm exec nx g @nx/js:lib packages/shared/model
```

Preview a generator without writing files:

```bash
pnpm exec nx g @nx/angular:component apps/web/src/app/features/player/player-page --dry-run
```
