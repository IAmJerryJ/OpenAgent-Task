import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import sequelize from "./config/database";
import Contact from "./models/Contact";
import contactsRouter from "./routes/contacts";
import { seedDatabase } from "./seeders/sampleData";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.get("/", (req, res) => {
  res.json({ message: "OpenAgent API Server is running!" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: "Connected",
  });
});

app.use((req, res) => notFoundHandler(req, res));

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database models synchronized.");

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API endpoints: http://localhost:${PORT}/api/contacts`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
