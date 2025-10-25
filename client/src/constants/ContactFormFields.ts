import type { FormFieldConfig } from "@/types";

export const CONTACT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    required: true,
  },
  {
    name: "message",
    label: "What do you want to speak to us about",
    type: "textarea",
    required: false,
    rows: 4,
  },
] as const;
