import apiClient from "./config";
import type {
  Contact,
  ContactCreateData,
  ContactUpdateData,
  ContactsResponse,
} from "./types";

export const contactsApi = {
  getContacts: async (
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

    const response = await apiClient.get(`/api/contacts?${params.toString()}`);
    return response.data;
  },

  getContactById: async (id: number): Promise<Contact> => {
    const response = await apiClient.get(`/api/contacts/${id}`);
    return response.data;
  },

  createContact: async (contactData: ContactCreateData): Promise<Contact> => {
    const response = await apiClient.post("/api/contacts", contactData);
    return response.data;
  },

  updateContact: async (
    id: number,
    contactData: ContactUpdateData
  ): Promise<Contact> => {
    const response = await apiClient.put(`/api/contacts/${id}`, contactData);
    return response.data;
  },

  verifyContact: async (id: number): Promise<Contact> => {
    const response = await apiClient.patch(`/api/contacts/${id}/verify`);
    return response.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/contacts/${id}`);
  },
};

export default contactsApi;
