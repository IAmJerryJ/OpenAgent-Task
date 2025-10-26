# OpenAgent Task: Contact App - Server

## Environment Variables

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

## Available Scripts

- `npm install`: Install the dependencies
- `npm run build`: Build the production version
- `npm run start`: Start the production version
- `npm run dev`: Start the development version without seeding data (Hot Reload)
- `npm run dev:seed`: Start the development version with seeding 50 sample contacts data (Hot Reload, and only seed if database is empty)
- `npm run dev:reset`: Start the development version with reset mode and seeding 50 sample contacts data (Hot Reload, and reset database and seed data)
- `npm run test`: Run the tests
- `npm run format`: Format the code
- `npm run format:check`: Check the code formatting
- `npm run lint`: Lint the code
- `npm run lint:fix`: Fix the lint errors

## Access URLs:

http://localhost:3000
