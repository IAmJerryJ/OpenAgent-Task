import { Calendar, Clock, Mail, Phone } from "lucide-react";
import { formatSydneyTime } from "@/lib/time";
import type { InfoFieldConfig } from "@/types";

export const CONTACT_CARD_INFO_FIELD: InfoFieldConfig[] = [
  {
    icon: Mail,
    label: "Email",
    key: "email",
  },
  {
    icon: Phone,
    label: "Phone",
    key: "phone",
  },
  {
    icon: Calendar,
    label: "Created At",
    key: "createdAt",
    formatter: (value: string | number | Date) =>
      formatSydneyTime(String(value)),
  },
  {
    icon: Clock,
    label: "Updated At",
    key: "updatedAt",
    formatter: (value: string | number | Date) =>
      formatSydneyTime(String(value)),
  },
];
