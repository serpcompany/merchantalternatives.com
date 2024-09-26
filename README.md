# README


- This project uses a monorepo structure with Turborepo, from the boilerplate starter template [supastarter](https://supastarter.dev/docs/nuxt)
- The main Nuxt application (the website) is located in the `apps/web` directory.


## Installation Steps

```bash

# Create .env file (in ~/apps/web/.env)
cd apps/web && mv .env.example .env

# Install dependencies
pnpm install

# Setup prisma
pnpm db:generate
```

> Note: Do NOT run `db:push` unless you're setting up a fresh development environment with an empty database and are sure you aren't connected to the main DB or youll erase everything and put a bounty on your own head of $1000.
