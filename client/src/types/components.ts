import type { ContactFormData } from "@/lib/validation";
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
  totalItems: number;
  itemsPerPage: number;
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

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  currentSearchTerm: string;
}

export interface ContactsGridTableProps {
  contacts: Contact[];
  isSmallScreen: boolean;
  onInfoClick: (contact: Contact) => void;
  onMarkAsVerified: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface FormFieldConfig {
  name: keyof ContactFormData;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
  rows?: number;
}

export interface InfoField {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  key: keyof Contact;
}

export interface InfoFieldConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  key: keyof Contact;
  formatter?: (value: string | number | Date) => string;
}

export interface TableColumn {
  key: keyof Contact | "actions" | "info";
  label: string;
  width: string;
  align: "left" | "center" | "right";
  sticky?: "left" | "right";
  formatter?: (value: string | number | Date) => string;
  className?: string;
}
