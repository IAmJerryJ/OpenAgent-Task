import { formatSydneyTime } from "@/lib/time";
import type { TableColumn } from "@/types";

export const CONTACTS_GRID_TABLE_COLUMN: TableColumn[] = [
  {
    key: "info",
    label: "Info",
    width: "50px",
    align: "center",
    sticky: "left",
    className:
      "text-center sticky left-0 bg-gray-200 z-10 border border-gray-300 px-4 py-3",
  },
  {
    key: "firstName",
    label: "First Name",
    width: "150px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
  },
  {
    key: "lastName",
    label: "Last Name",
    width: "150px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
  },
  {
    key: "email",
    label: "Email",
    width: "250px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
  },
  {
    key: "phone",
    label: "Phone",
    width: "200px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
  },
  {
    key: "note",
    label: "Note",
    width: "300px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
  },
  {
    key: "createdAt",
    label: "Created At",
    width: "200px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
    formatter: (value: string | number | Date) =>
      formatSydneyTime(String(value)),
  },
  {
    key: "updatedAt",
    label: "Updated At",
    width: "200px",
    align: "left",
    className: "text-left border border-gray-300 px-4 py-3",
    formatter: (value: string | number | Date) =>
      formatSydneyTime(String(value)),
  },
  {
    key: "actions",
    label: "Actions",
    width: "250px",
    align: "center",
    sticky: "right",
    className:
      "text-center sticky right-0 bg-gray-200 z-10 whitespace-nowrap px-4 border border-gray-300",
  },
];
