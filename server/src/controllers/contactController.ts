import { Request, Response } from "express";
import { ContactService } from "../services/contactService";
import {
  CreateContactInput,
  UpdateContactInput,
  QueryParams,
  IdParam,
} from "../schemas/contactSchemas";

export class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  getContacts = async (req: Request, res: Response) => {
    try {
      const { page, limit, search } = req.validatedQuery!;
      const result = await this.contactService.getContacts(page, limit, search);
      res.json(result);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getContactById = async (req: Request, res: Response) => {
    try {
      const { id } = req.validatedParams!;
      const contact = await this.contactService.getContactById(id);

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  createContact = async (req: Request, res: Response) => {
    try {
      const contactData = req.body as CreateContactInput;
      const contact = await this.contactService.createContact(contactData);
      res.status(201).json(contact);
    } catch (error: any) {
      console.error("Error creating contact:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Email already exists" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateContact = async (req: Request, res: Response) => {
    try {
      const { id } = req.validatedParams!;
      const updateData = req.body as UpdateContactInput;

      const contact = await this.contactService.getContactById(id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      const updatedContact = await this.contactService.updateContact(
        id,
        updateData
      );
      res.json(updatedContact);
    } catch (error: any) {
      console.error("Error updating contact:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Email already exists" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };

  verifyContact = async (req: Request, res: Response) => {
    try {
      const { id } = req.validatedParams!;
      const contact = await this.contactService.getContactById(id);

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      const updatedContact = await this.contactService.verifyContact(id);
      res.json(updatedContact);
    } catch (error) {
      console.error("Error verifying contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteContact = async (req: Request, res: Response) => {
    try {
      const { id } = req.validatedParams!;
      const contact = await this.contactService.getContactById(id);

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      await this.contactService.deleteContact(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
