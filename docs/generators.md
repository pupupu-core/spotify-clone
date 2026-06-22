# Nx Generators

## Angular

```bash
pnpm exec nx g @nx/angular:component apps/web/src/app/features/player/player-page
pnpm exec nx g @nx/angular:service apps/web/src/app/core/services/entity --skipTests
pnpm exec nx g @nx/angular:lib apps/web/src/app/shared/ui
```

## Nest

```bash
pnpm exec nx g @nx/nest:module apps/api/src/app/gateway/rest/v1/entity/entity
pnpm exec nx g @nx/nest:controller apps/api/src/app/gateway/rest/v1/entity/entity --unitTestRunner=none
pnpm exec nx g @nx/nest:service apps/api/src/app/infrastructure/storage/audio-storage/audio-storage --unitTestRunner=none
```

## Shared TypeScript Library

```bash
pnpm exec nx g @nx/js:lib packages/shared/model
```

## Dry Run

Preview a generator without writing files:

```bash
pnpm exec nx g @nx/angular:component apps/web/src/app/features/player/player-page --dry-run
```
