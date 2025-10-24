export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactCreateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note?: string;
}

export interface ContactUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  note?: string;
  verified?: boolean;
}
