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

export interface ContactSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  verified?: boolean;
}

export interface ContactStats {
  total: number;
  verified: number;
  unverified: number;
}
