import React from "react";
import { Info } from "lucide-react";

import type { ContactsGridTableProps, Contact, TableColumn } from "@/types";
import { CONTACTS_GRID_TABLE_COLUMN } from "@/constants/ContactsGridTableColumn";

import ActionButtons from "./ActionButtons";

function ContactsGridTable({
  contacts,
  isSmallScreen,
  onInfoClick,
  onMarkAsVerified,
  onDelete,
}: ContactsGridTableProps) {
  const renderTableHeader = () => (
    <thead>
      <tr>
        {CONTACTS_GRID_TABLE_COLUMN.map(column => (
          <th
            key={column.key}
            className={column.className}
            style={{
              width:
                column.key === "actions"
                  ? isSmallScreen
                    ? "120px"
                    : "250px"
                  : column.width,
            }}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableCell = (contact: Contact, column: TableColumn) => {
    if (column.key === "info") {
      return (
        <td
          className="text-center sticky left-0 bg-gray-200 z-10 border border-gray-300 px-4 py-3"
          style={{ width: "20px" }}
        >
          <button
            onClick={() => onInfoClick(contact)}
            className="btn btn-sm btn-link btn-info w-5 h-5 p-0 hover:text-blue-600"
            title="View Details"
          >
            <Info className="w-5 h-5" />
          </button>
        </td>
      );
    }

    if (column.key === "actions") {
      return (
        <td
          className="text-right sticky right-0 bg-gray-200 z-10 whitespace-nowrap px-4 border border-gray-300"
          style={{
            width: isSmallScreen ? "120px" : "250px",
          }}
        >
          <ActionButtons
            contactId={contact.id}
            isVerified={contact.verified}
            isSmallScreen={isSmallScreen}
            onMarkAsVerified={onMarkAsVerified}
            onDelete={onDelete}
          />
        </td>
      );
    }

    const rawValue = contact[column.key as keyof Contact];
    const value = column.formatter
      ? column.formatter(rawValue as string | number | Date)
      : String(rawValue);

    const cellClassName =
      column.key === "firstName"
        ? "font-medium border border-gray-300 px-4 py-3 truncate"
        : column.key === "email"
          ? "text-sm text-gray-600 border border-gray-300 px-4 py-3 truncate"
          : column.key === "note"
            ? "text-sm truncate border border-gray-300 px-4 py-3"
            : "text-sm border border-gray-300 px-4 py-3";

    return (
      <td
        className={cellClassName}
        style={{ width: column.width }}
        title={String(value)}
      >
        {String(value)}
      </td>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table
        className="table table-zebra table-fixed w-full border border-gray-300"
        style={{ tableLayout: "fixed" }}
      >
        {renderTableHeader()}
        <tbody>
          {contacts.map((contact: Contact) => (
            <tr key={contact.id} className="hover">
              {CONTACTS_GRID_TABLE_COLUMN.map(column => (
                <React.Fragment key={column.key}>
                  {renderTableCell(contact, column)}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsGridTable;
