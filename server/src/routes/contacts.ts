import express from "express";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  verifyContactController,
  deleteContactController,
} from "../controllers/contactController";
import {
  createContactSchema,
  updateContactSchema,
  queryParamsSchema,
  idParamSchema,
} from "../schemas/contactSchemas";
import {
  validateAndTransform,
  validateQuery,
  validateParams,
} from "../middleware/zodValidation";

const router = express.Router();

router.get("/", validateQuery(queryParamsSchema), getContactsController);

router.get("/:id", validateParams(idParamSchema), getContactByIdController);

router.post(
  "/",
  validateAndTransform(createContactSchema),
  createContactController
);

router.put(
  "/:id",
  validateParams(idParamSchema),
  validateAndTransform(updateContactSchema),
  updateContactController
);

router.patch(
  "/:id/verify",
  validateParams(idParamSchema),
  verifyContactController
);

router.delete("/:id", validateParams(idParamSchema), deleteContactController);

export default router;
