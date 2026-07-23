- nx registry `https://nx.dev/docs/plugin-registry`

[link](https://nx.dev/docs/reference/workspace/generators)

- create a new nx workspace

```bash
pnpm dlx create-nx-workspace@latest name --pm pnpm
```

- add `@nx/angular` and `@nx/nest`

```bash
pnpm exec nx add @nx/angular
pnpm exec nx add @nx/nest
```

- generate an Angular app

```bash
pnpm exec nx g @nx/angular:app app/web
```

- generate a NestJS app

```bash
pnpm exec nx g @nx/nest:app apps/api
```

- generate a NestJS controller

```bash
 pnpm exec nx g @nx/nest:app apps/api
```

- add `@angular-devkit/core`

```bash
pnpm exec nx add @nx/angular
```

- generate a new Angular app

```bash
pnpm exec nx g @nx/angular:app apps/music-flow
```

- rename project command

```bash
pnpm exec nx g @nx/workspace:move apps/web --projectName=music-flow --newProjectName=web
```

- remove project

```bash
pnpm exec nx g remove booking-some-project
```

- add/create shared ts lib
  [link](https://nx.dev/docs/technologies/typescript/generators#examples)

```bash
pnpm exec nx g @nx/js:lib packages/shared/models
```

- remove library

```bash
pnpm exec nx g @nx/workspace:remove models
```

- angular generators
  [link](https://nx.dev/docs/technologies/angular/generators)

- `@nx/angular:component`
- `@nx/angular:service`
- `@nx/angular:pipe`
- `@nx/angular:directive`
- `@nx/angular:guard`
- `@nx/angular:interceptor`
- `@nx/angular:resolver`
- `@nx/angular:application`
- `@nx/angular:library`

create a lib project

```bash
pnpm exec nx g @nx/angular:lib packages/client/data-access
```

> create artifacts

- generate artifact in project dir

```bash
pnpm exec nx g @nx/angular:component
pnpm exec nx g @nx/angular:pipe
```

- generate service to project path

```bash
pnpm exec nx g @nx/angular:services api --project=data-access --path=packages/client/data-access/src/lib
```

```bash
pnpm exec nx g @nx/angular:services api --project=web --path=apps/web/src/app/core/services
```

- set up proxy
  [link](https://nx.dev/docs/technologies/node/guides/application-proxies#vite-server)

---

idiomatic

```bash
pnpm exec nx g @nx/nest:module entity --project=api
pnpm exec nx g @nx/nest:controller entity --project=api --skipTests
pnpm exec nx g @nx/nest:services entity --project=api --skipTests
```

---

custom

```bash
pnpm exec nx g @nx/nest:services infrastructure/storage/audio-storage --project=api --skipTests
pnpm exec nx g @nx/nest:services infrastructure/prisma/prisma --project=api --skipTests
pnpm exec nx g @nx/nest:services infrastructure/clients/spotify/spotify --project=api --skipTests
```
