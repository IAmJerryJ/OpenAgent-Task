import type { Contact } from "./contacts";

export interface ActionButtonsProps {
  contactId: number;
  isVerified: boolean;
  isSmallScreen: boolean;
  onMarkAsVerified: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface ContactCardProps {
  contact: Contact;
  onClose: () => void;
  formatSydneyTime: (dateString: string) => string;
  onMarkAsVerified: (id: number) => void;
  onDelete: (id: number) => void;
  isSmallScreen: boolean;
}

export interface ContactsGridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isSmallScreen: boolean;
}

export interface FloatingLabelInputProps {
  type?: string;
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  rows?: number;
  className?: string;
  error?: string;
}
