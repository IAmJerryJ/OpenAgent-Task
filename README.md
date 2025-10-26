# OpenAgent Task: Contact App

This project is for the OpenAgent Take Home Assessment. It includes a "Contact Us" page and a "Contacts List" page.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start (Without Docker)](#quick-start-without-docker)
- [Quick Start (With Docker)](#quick-start-with-docker)
- [Assumptions](#assumptions)

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

- Create a new PostgreSQL database with following credentials:

  - Host: `localhost`
  - Port: `5432`
  - Database Name: `openagent_task_db`
  - Username: `postgres`
  - Password: `password`

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
# If SEED_MODE is "seed", the database will be seeded with 50 sample contacts data only if the database is empty;
# If SEED_MODE is "reset", the database will be reset and seeded with 50 sample contacts data;
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

- Development mode (Hot reload) with seeding 50 sample contacts data only if database is empty

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

- Only run database container when needed

```bash
cd database
docker-compose up -d # Only Start PostgreSQL17 Database Container (Detached mode)
docker-compose down # Stop and remove database container
```

## Assumptions

- User can run app in seed/reset mode to populate database with 50 sample contacts data.
- In Contact Us page, First Name, Last Name, Email, Phone Number are required fields.
- In Conact Us page, Message field is optional, and can be up to 500 characters long.
- Phone Number is 1-20 characters long and can contain numbers, spaces, parentheses, and dashes.
- Email is 1-100 characters long and must be a valid email address.
- First Name and Last Name are 1-50 characters long.
- Only data with same email and phone number combination is considered as the same contact, and not allowed to be created again.
- In Contacts List page, data is fetched from the server with pagination 10 items per page and 5 items per page on small screens.
- In Contacts List page, data is fetched from the server ordered by ID in descending order.
