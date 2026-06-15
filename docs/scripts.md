# Package Scripts

## Development

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the web app dev server. This also starts the API through the web target dependency. |
| `pnpm serve:backend` | Run only the NestJS API. |
| `pnpm serve:frontend` | Run only the Angular app without starting the API target. |
| `pnpm dev:up` | Start all Docker Compose services in the background. |
| `pnpm db:up` | Start only the database Docker Compose service. |
| `pnpm dev:down` | Stop and remove Docker Compose services. |
| `pnpm dev:down:apps` | Stop the deployed/local app containers named `pupufy-api` and `pupufy-web`. |

## Workspace Info

| Command | Description |
| --- | --- |
| `pnpm show:backend` | Show Nx project details for the API app. |
| `pnpm show:frontend` | Show Nx project details for the web app. |
| `pnpm reset` | Reset the Nx cache/daemon state. |

## Dependencies

| Command | Description |
| --- | --- |
| `pnpm deps` | Install dependencies from the committed lockfile. |

## Checks

| Command | Description |
| --- | --- |
| `pnpm format:check` | Check formatting with Prettier. |
| `pnpm lint` | Run lint checks for all projects. |
| `pnpm lint:check` | Run lint checks for all projects. |
| `pnpm lint:web:check` | Run lint checks for the web app. |
| `pnpm lint:api:check` | Run lint checks for the API app. |
| `pnpm stylelint:web` | Check web styles with Stylelint. |
| `pnpm stylelint:affected` | Run Stylelint for affected projects. |
| `pnpm typecheck` | Run TypeScript checks for web, API, and shared packages. |
| `pnpm typecheck:web` | Run TypeScript checks for the web app. |
| `pnpm typecheck:api` | Run TypeScript checks for the API app. |
| `pnpm typecheck:packages` | Run TypeScript checks for shared packages. |
| `pnpm typecheck:affected` | Run TypeScript checks for affected projects. |
| `pnpm check:precommit` | Run staged-file checks used before commits. |
| `pnpm check:prepush` | Run affected lint/style/typecheck and format checks before push. |
| `pnpm commitlint` | Validate a commit message with Commitlint. |

## Fixes

| Command | Description |
| --- | --- |
| `pnpm format` | Format the repository with Prettier. |
| `pnpm lint:fix` | Run lint auto-fixes for all projects. |
| `pnpm lint:web:fix` | Run lint auto-fixes for the web app. |
| `pnpm lint:api:fix` | Run lint auto-fixes for the API app. |
| `pnpm stylelint:web:fix` | Run Stylelint auto-fixes for the web app. |
| `pnpm stylelint:affected:fix` | Run Stylelint auto-fixes for affected projects. |

## Build

| Command | Description |
| --- | --- |
| `pnpm build` | Build all buildable projects. |
| `pnpm build:backend` | Build the API app. |
| `pnpm build:frontend` | Build the web app. |
| `pnpm build:affected` | Build affected projects. |

## Database

| Command | Description |
| --- | --- |
| `pnpm db:validate` | Validate the Prisma schema. |
| `pnpm db:format` | Format the Prisma schema. |
| `pnpm db:generate` | Generate Prisma Client. |
| `pnpm db:migrate` | Create/apply a development Prisma migration. |
| `pnpm db:deploy` | Apply Prisma migrations in deploy mode. |
| `pnpm db:studio` | Open Prisma Studio using the local database URL. |

## Tests

| Command | Description |
| --- | --- |
| `pnpm test:web` | Run web unit tests. |
| `pnpm test:web:watch` | Run web unit tests in watch mode. |
| `pnpm test:utils` | Run shared utils unit tests. |
| `pnpm test:utils:watch` | Run shared utils unit tests in watch mode. |
| `pnpm test:e2e` | Run Playwright end-to-end tests. |
| `pnpm test:e2e:ui` | Run Playwright end-to-end tests in UI mode. |
| `pnpm test:e2e:headed` | Run Playwright end-to-end tests with visible browser windows. |
| `pnpm test:e2e:debug` | Run Playwright end-to-end tests in debug mode. |
| `pnpm test:e2e:report` | Open the latest Playwright HTML report. |

## Git Hooks

| Command | Description |
| --- | --- |
| `pnpm prepare` | Install Husky git hooks. |
