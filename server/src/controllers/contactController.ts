import { Request, Response } from "express";
import {
  getContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  verifyContactService,
  deleteContactService,
} from "../services/contactService";
import {
  CreateContactInput,
  UpdateContactInput,
} from "../schemas/contactSchemas";

export const getContactsController = async (req: Request, res: Response) => {
  try {
    const { page, limit, search } = req.validatedQuery!;
    const result = await getContactsService(page, limit, search);
    res.json(result);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getContactByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.validatedParams!;
    const contact = await getContactByIdService(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createContactController = async (req: Request, res: Response) => {
  try {
    const contactData = req.body as CreateContactInput;
    const contact = await createContactService(contactData);
    res.status(201).json(contact);
  } catch (error: unknown) {
    console.error("Error creating contact:", error);
    if (
      error instanceof Error &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res
        .status(400)
        .json({ error: "Email and phone combination already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.validatedParams!;
    const updateData = req.body as UpdateContactInput;

    const contact = await getContactByIdService(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const updatedContact = await updateContactService(id, updateData);
    res.json(updatedContact);
  } catch (error: unknown) {
    console.error("Error updating contact:", error);
    if (
      error instanceof Error &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res
        .status(400)
        .json({ error: "Email and phone combination already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.validatedParams!;
    const contact = await getContactByIdService(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const updatedContact = await verifyContactService(id);
    res.json(updatedContact);
  } catch (error) {
    console.error("Error verifying contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.validatedParams!;
    const contact = await getContactByIdService(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await deleteContactService(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
