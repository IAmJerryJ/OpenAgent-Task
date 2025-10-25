import { Request, Response } from "express";

export const errorHandler = (error: unknown, req: Request, res: Response) => {
  console.error("Error:", error);

  if (
    error instanceof Error &&
    error.name === "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({
      error:
        "Duplicate entry. This email and phone combination already exists.",
    });
  }

  if (error instanceof Error && error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: (error as any).errors.map((err: any) => ({
        field: err.path,
        message: err.message,
      })),
    });
  }

  if (
    error instanceof Error &&
    error.name === "SequelizeForeignKeyConstraintError"
  ) {
    return res.status(400).json({
      error: "Foreign key constraint error",
    });
  }

  if (error instanceof Error && error.name === "SequelizeConnectionError") {
    return res.status(500).json({
      error: "Database connection error",
    });
  }

  const statusCode = (error as any).statusCode || 500;
  const message =
    error instanceof Error ? error.message : "Internal server error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" &&
      error instanceof Error && { stack: error.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
};
