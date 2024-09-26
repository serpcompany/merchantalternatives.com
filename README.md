# README


- This project uses a monorepo structure with Turborepo, from the boilerplate starter template [supastarter](https://supastarter.dev/docs/nuxt)
- The main Nuxt application (the website) is located in the `apps/web` directory.


## Installation Steps

**1. Clone the repo & setup the `.env` file:**
```bash
# Create .env file (in ~/apps/web/.env)
mv apps/web/.env.example apps/web/.env
```
...
and fill out the `.env` file with the necessary environment variables.


**2. Install dependencies:**

```bash
# Install dependencies from project root
pnpm install
```

**3. Setup prisma:**
```bash
pnpm db:generate
```
> Note: Do NOT run `db:push` unless you're setting up a fresh development environment with an empty database and are sure you aren't connected to the main DB or youll erase everything and put a bounty on your own head of $1000, dead or alive (preferably dead).
