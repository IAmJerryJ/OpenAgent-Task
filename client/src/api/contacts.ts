import apiClient from "@/lib/axios";
import type {
  Contact,
  ContactCreateData,
  ContactUpdateData,
  ContactsResponse,
} from "@/types";

const CONTACTS_URL = "/api/contacts";

export const httpGetContacts = async (
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<ContactsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  const response = await apiClient.get(`${CONTACTS_URL}?${params.toString()}`);
  return response.data;
};

export const httpGetContactById = async (id: number): Promise<Contact> => {
  const response = await apiClient.get(`${CONTACTS_URL}/${id}`);
  return response.data;
};

export const httpCreateContact = async (
  contactData: ContactCreateData
): Promise<Contact> => {
  const response = await apiClient.post(CONTACTS_URL, contactData);
  return response.data;
};

export const httpUpdateContact = async (
  id: number,
  contactData: ContactUpdateData
): Promise<Contact> => {
  const response = await apiClient.put(`${CONTACTS_URL}/${id}`, contactData);
  return response.data;
};

export const httpVerifyContact = async (id: number): Promise<Contact> => {
  const response = await apiClient.patch(`${CONTACTS_URL}/${id}/verify`);
  return response.data;
};

export const httpDeleteContact = async (id: number): Promise<void> => {
  await apiClient.delete(`${CONTACTS_URL}/${id}`);
};
