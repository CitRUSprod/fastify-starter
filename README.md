# Fastify Starter

### Get started

> **NOTE:** Before using this template, you need to install `pnpm`.

Create a new project based on this template using `degit`:

```sh
pnpx degit CitRUSprod/fastify-starter my-app
cd my-app
pnpm i
```

Run in development mode:

```sh
pnpm dev
```

Build and run in production mode:

```sh
pnpm build
pnpm start
```

### Tools

Commit with `commitizen`:

```sh
pnpm commit
```

Check types with `tsc`:

```sh
pnpm validate
```

Lint with `prettier` and `eslint`:

```sh
pnpm lint
```

Format with `prettier` and `eslint`:

```sh
pnpm format
```

### Environment variables

All environment variables are written to the `.env` file. If it doesn't exist, just enter this command:

```sh
cp .env.example .env
```

### Database

> **NOTE:** Before using the database from this template, you need to install `docker` and `docker compose`.

Start and stop the `postgres` database:

```sh
db/start
db/stop
```
