import { Request } from "express";
import { QueryParams, IdParam } from "../schemas/contactSchemas";

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: QueryParams;
      validatedParams?: IdParam;
    }
  }
}
