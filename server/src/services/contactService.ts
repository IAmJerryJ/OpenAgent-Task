import { Op } from "sequelize";
import Contact from "../models/Contact";
import {
  CreateContactInput,
  UpdateContactInput,
} from "../schemas/contactSchemas";

export const getContactsService = async (
  page: number,
  limit: number,
  search?: string
) => {
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (search) {
    whereClause = {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
        { note: { [Op.iLike]: `%${search}%` } },
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
};

export const getContactByIdService = async (id: number) => {
  return await Contact.findByPk(id);
};

export const createContactService = async (contactData: CreateContactInput) => {
  return await Contact.create({
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    email: contactData.email,
    phone: contactData.phone,
    note: contactData.note || "",
    verified: false,
  });
};

export const updateContactService = async (
  id: number,
  contactData: UpdateContactInput
) => {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    throw new Error("Contact not found");
  }

  await contact.update(contactData);
  return contact;
};

export const verifyContactService = async (id: number) => {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    throw new Error("Contact not found");
  }

  await contact.update({ verified: true });
  return contact;
};

export const deleteContactService = async (id: number) => {
  const contact = await Contact.findByPk(id);
  if (!contact) {
    throw new Error("Contact not found");
  }

  await contact.destroy();
};

export const searchContactsService = async (
  searchTerm: string,
  page: number = 1,
  limit: number = 10
) => {
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
};
