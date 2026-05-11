# Architecture

```text
apps/
  web/                 # Nx project: Angular SPA
  api/                 # Nx project: NestJS backend

packages/
  shared/              # Grouping folder, !not an Nx project
    model/             # Nx project: public API contracts
    utils/             # Nx project: pure helpers and utilities
    config/            # Nx project: constants and config values
```

Nx projects are discovered from project metadata such as `project.json`.
Folders like `apps/`, `packages/`, and `packages/shared/` are organizational
folders unless they contain their own project configuration.

## Angular App

```text
apps/web/src/app/
  core/                # App-wide singleton services, providers, guards, interceptors
    services/          # Root-level Angular services, API clients, browser adapters

  features/            # Feature areas and routed screens
    player/            # Example: player feature
    search/            # Example: search feature
    library/           # Example: user library feature

  shared/              # Angular-only reusable UI/components/directives/pipes

  app.config.ts        # Root Angular providers
  app.routes.ts        # Root route configuration
  app.html             # Root shell template
```

Angular-specific code stays in `apps/web`. Cross-app public contracts stay in
`packages/shared/model`. Pure framework-agnostic helpers can go in
`packages/shared/utils`.

Recommended dependency direction:

```text
features/ -> core/
features/ -> shared/
core/     -> packages/shared/model
core/     -> packages/shared/config
shared/   -> packages/shared/model
```

Avoid importing feature code from `core/` or `shared/`. Keep `core/` for
singleton infrastructure and app-wide integrations, not feature business logic.

## Backend App

```text
apps/api/src/app/
  core/                # Backend business layer
    constants/         # Backend business constants
    errors/            # Backend domain errors
    jobs/              # Scheduled/background business entry points (?)
    lib/               # Reusable backend business helpers
    listeners/         # Domain/event listeners (?)
    models/            # Backend domain types; may reuse Prisma types internally
    steps/             # Small business operations used by workflows
    workflows/         # Multi-step business scenarios

  infrastructure/      # External tools and technical integrations
    DB/                # Database client, Prisma wrapper, db errors
    clientA/           # External API clients, SDK wrappers, e.g SoundCloud API client
    clientB/           # External API clients, SDK wrappers, e.g lastFM API client
    storage/           # File/object storage adapter/S3 bucket/MiniO (?)
    encryption/        # Hashing/encryption helpers (?)


  gateway/             # How the backend talks to the outside world
    html/              # Server-rendered or static HTML entry points
    rest/              # HTTP controllers/routes
    static/            # Static file serving
    bot/               # bot gateway

  shared/              # Optional backend-only reusable utilities

  app.module.ts        # Nest root module
```

Dependency direction:

```text
gateway/        -> core/
gateway/        -> shared/
gateway/        -> packages/shared/model

core/           -> infrastructure/
core/           -> shared/
core/           -> packages/shared/model

infrastructure/ -> shared/
infrastructure/ -> packages/shared/config

shared/         -> packages/shared/config
```

Notes:

- `gateway/` contains outside-world adapters; do not import it from `core/`.
- `shared/` is backend-only and is different from `packages/shared/`.
- Prisma, backend DTOs, validation classes, and persistence types stay in `apps/api`.
- Public API contracts live in `packages/shared/model`.
- Data flow: `Prisma record -> backend domain model -> shared API response`.
