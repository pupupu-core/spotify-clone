# Guard
https://angular.dev/guide/routing/route-guards

```bash
ng generate guard CUSTOM_NAME
```

```bash
pnpm nx g @schematics/angular:guard guards/auth/auth-guard --project=web
```

# Material UI
```bash
https://material.angular.dev/components/categories
```

# Swagger
```bash
pnpm add @nestjs/swagger
```

# Prisma
> https://www.prisma.io/docs/guides/frameworks/nestjs

```bash
pnpm add @prisma/client @prisma/adapter-pg pg
```

> pg is the actual Node.js PostgreSQL driver.


```bash
pnpm add -D prisma
```

## Create the Prisma config
```bash
pnpm prisma init
```

> set correct path

## Add scripts and envs
   "db:validate": "prisma validate",
    "db:format": "prisma format",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:studio": "prisma studio"

> choose docker or local


# Docker
> https://docs.docker.com/compose/
> https://docs.docker.com/reference/compose-file/
> https://docs.docker.com/guides/postgresql/networking-and-connectivity/


> compose up, migrate db
