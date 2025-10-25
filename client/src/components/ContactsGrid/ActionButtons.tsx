import { CheckCircle, Trash2 } from "lucide-react";

import type { ActionButtonsProps } from "@/types";

function ActionButtons({
  contactId,
  isVerified,
  isSmallScreen,
  onMarkAsVerified,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2 justify-between">
      {isSmallScreen ? (
        <>
          <button
            onClick={() => onMarkAsVerified(contactId)}
            disabled={isVerified}
            className={`btn btn-sm btn-square w-10 h-10 ${
              isVerified
                ? "btn-success cursor-not-allowed"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
            }`}
            title={isVerified ? "Verified" : "Mark as Verified"}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contactId)}
            className="btn btn-sm btn-square w-10 h-10 bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => onMarkAsVerified(contactId)}
            disabled={isVerified}
            className={`btn btn-sm w-32 ${
              isVerified
                ? "btn-success cursor-not-allowed"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
            }`}
          >
            {isVerified ? "Verified" : "Mark as Verified"}
          </button>
          <button
            onClick={() => onDelete(contactId)}
            className="btn btn-sm w-20 bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ActionButtons;
