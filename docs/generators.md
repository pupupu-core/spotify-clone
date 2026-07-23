# Nx Generators

## Angular

```bash
pnpm exec nx g @nx/angular:component apps/web/src/app/features/player/player-page
pnpm exec nx g @nx/angular:services --project=web --path=apps/web/src/app/features/auth/services/sign-up --skipTests
pnpm exec nx g @nx/angular:lib apps/web/src/app/shared/ui
pnpm exec nx g @nx/angular:pipe apps/web/src/app/shared/pipes/http-error-message --skipTests
```

## Nest

```bash
pnpm exec nx g @nx/nest:module apps/api/src/app/gateway/rest/v1/entity/entity
pnpm exec nx g @nx/nest:controller apps/api/src/app/gateway/rest/v1/entity/entity --unitTestRunner=none
pnpm exec nx g @nx/nest:services apps/api/src/app/infrastructure/storage/audio-storage/audio-storage --unitTestRunner=none
```

## Shared TypeScript Library

```bash
pnpm exec nx g @nx/js:lib packages/shared/models
```

## Dry Run

Preview a generator without writing files:

```bash
pnpm exec nx g @nx/angular:component apps/web/src/app/features/player/player-page --dry-run
```
