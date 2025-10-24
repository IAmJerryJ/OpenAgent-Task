import express from "express";
import { ContactController } from "../controllers/contactController";
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
const contactController = new ContactController();

router.get(
  "/",
  validateQuery(queryParamsSchema),
  contactController.getContacts
);

router.get(
  "/:id",
  validateParams(idParamSchema),
  contactController.getContactById
);

router.post(
  "/",
  validateAndTransform(createContactSchema),
  contactController.createContact
);

router.put(
  "/:id",
  validateParams(idParamSchema),
  validateAndTransform(updateContactSchema),
  contactController.updateContact
);

router.patch(
  "/:id/verify",
  validateParams(idParamSchema),
  contactController.verifyContact
);

router.delete(
  "/:id",
  validateParams(idParamSchema),
  contactController.deleteContact
);

export default router;
