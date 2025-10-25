# OpenAgent Task: Contact App

This project is for the OpenAgent Take Home Assessment. It includes a "Contact Us" page and a "Contacts List" page.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start (Without Docker)](#quick-start-without-docker)
- [Quick Start (With Docker)](#quick-start-with-docker)

## Tech Stack

**Language:** TypeScript

**Frontend:** React, Vite, Axios, React Router, Tailwind CSS, DaisyUI, Lucide React, React Hot Toast, Nginx

**Backend:** Node.js v22, Express, Sequelize, Nodemon

**Database:** PostgreSQL 17

**Validation:** Zod

**Testing:** Vitest

**Containerization:** Docker, Docker Compose

**Package Manager:** npm

## Quick Start (Without Docker)

### Start from Root Directory

- Add environment variables

Create `.env` file under `./client/` and `./server/`

Client Environment Variables:

```bash
VITE_API_URL=http://localhost:3000
```

Server Environment Variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=openagent_task_db
DB_USER=postgres
DB_PASSWORD=password
PORT=3000
NODE_ENV=development # "development" or "production"
SEED_MODE=none # "seed" or "reset" or "none"; Default is "none";
# If SEED_MODE is "seed", the database will be seeded with sample data only if the database is empty;
# If SEED_MODE is "reset", the database will be reset and seeded with sample data;
# If SEED_MODE is "none", the database will not be seeded with sample data;

```

- Install dependencies

```bash
npm run install:all
```

- Start in development mode (Hot reload)

```bash
# No seeding data
npm run dev

# Seed data only if database is empty
npm run dev:seed

# Reset database and seed data
npm run dev:reset
```

- Build

```bash
npm run build
```

- Start in production mode (Start from built files)

```bash
npm run start
```

- Test

```bash
npm run test
```

- Access URLs:

Development:

```bash
http://localhost:5173 # Client
http://localhost:3000 # Server
localhost:5432 # Database
```

Production:

```bash
http://localhost:4173 # Client
http://localhost:3000 # Server
localhost:5432 # Database
```

### Start from Client Directory

- [Client](./client/README.md)

### Start from Server Directory

- [Server](./server/README.md)

## Quick Start (With Docker)

### Start from Root Directory

- Development mode (Hot reload) with seeding data only if database is empty

```bash
docker-compose -f docker-compose.dev.yml up -d --build # Build and Start All Docker Containers
docker-compose -f docker-compose.dev.yml up -d # Only Start All Docker Containers (Detached mode)
docker-compose -f docker-compose.dev.yml down # Stop and remove all Docker Containers

Access URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Database: localhost:5432
```

Other Scripts:

```bash
docker-compose -f docker-compose.dev.yml build # Build All Docker Images
docker-compose -f docker-compose.dev.yml build client # Build Client Docker Image
docker-compose -f docker-compose.dev.yml build server # Build Server Docker Image
docker-compose -f docker-compose.dev.yml build database # Build Database Docker Image
```

- Production mode (Start from built files)

```bash
docker-compose up -d --build # Build and Start All Docker Containers
docker-compose up -d # Only Start All Docker Containers (Detached mode)
docker-compose down # Stop and remove all Docker Containers

Access URLs:
- Frontend: http://localhost:80
- Backend: http://localhost:3000
- Database: localhost:5432
```

Other Scripts:

```bash
docker-compose build # Build All Docker Images
docker-compose build client # Build Client Docker Image
docker-compose build server # Build Server Docker Image
docker-compose build database # Build Database Docker Image
```
