import { Op } from "sequelize";
import Contact from "../models/Contact";
import {
  CreateContactInput,
  UpdateContactInput,
} from "../schemas/contactSchemas";

export class ContactService {
  async getContacts(page: number, limit: number, search?: string) {
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { phone: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const { count, rows } = await Contact.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return {
      contacts: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
      },
    };
  }

  async getContactById(id: number) {
    return await Contact.findByPk(id);
  }

  async createContact(contactData: CreateContactInput) {
    return await Contact.create({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      note: contactData.note || "",
      verified: false,
    });
  }

  async updateContact(id: number, contactData: UpdateContactInput) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await contact.update(contactData);
    return contact;
  }

  async verifyContact(id: number) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await contact.update({ verified: true });
    return contact;
  }

  async deleteContact(id: number) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await contact.destroy();
  }

  async getContactStats() {
    const totalContacts = await Contact.count();
    const verifiedContacts = await Contact.count({ where: { verified: true } });
    const unverifiedContacts = totalContacts - verifiedContacts;

    return {
      total: totalContacts,
      verified: verifiedContacts,
      unverified: unverifiedContacts,
    };
  }

  async searchContacts(
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Contact.findAndCountAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${searchTerm}%` } },
          { lastName: { [Op.iLike]: `%${searchTerm}%` } },
          { email: { [Op.iLike]: `%${searchTerm}%` } },
          { phone: { [Op.iLike]: `%${searchTerm}%` } },
          { note: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return {
      contacts: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
      },
    };
  }
}
