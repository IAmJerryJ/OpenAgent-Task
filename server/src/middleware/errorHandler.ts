import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      error: "Duplicate entry. This email already exists.",
    });
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors.map((err: any) => ({
        field: err.path,
        message: err.message,
      })),
    });
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      error: "Foreign key constraint error",
    });
  }

  if (error.name === "SequelizeConnectionError") {
    return res.status(500).json({
      error: "Database connection error",
    });
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
};
