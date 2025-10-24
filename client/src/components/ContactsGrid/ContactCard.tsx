import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  Trash2,
} from "lucide-react";
import type { Contact } from "../../api/types";

interface ContactCardProps {
  contact: Contact;
  onClose: () => void;
  formatSydneyTime: (dateString: string) => string;
  onMarkAsVerified: (id: number) => void;
  onDelete: (id: number) => void;
  isSmallScreen: boolean;
}

function ContactCard({
  contact,
  onClose,
  formatSydneyTime,
  onMarkAsVerified,
  onDelete,
  isSmallScreen,
}: ContactCardProps) {
  const [localContact, setLocalContact] = useState(contact);

  useEffect(() => {
    setLocalContact(contact);
  }, [contact]);

  const handleMarkAsVerified = () => {
    onMarkAsVerified(localContact.id);
    setLocalContact((prev) => ({ ...prev, verified: true }));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {localContact.firstName} {localContact.lastName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {localContact.verified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    Unverified
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">
                    {localContact.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">
                    {localContact.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="text-gray-900 font-medium">
                    {formatSydneyTime(localContact.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Updated At</p>
                  <p className="text-gray-900 font-medium">
                    {formatSydneyTime(localContact.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {localContact.note && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Message</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {localContact.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="flex gap-3">
            {isSmallScreen ? (
              <>
                <button
                  onClick={handleMarkAsVerified}
                  disabled={localContact.verified}
                  className={`btn btn-sm btn-square w-10 h-10 ${
                    localContact.verified
                      ? "btn-success cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
                  }`}
                  title={
                    localContact.verified ? "Verified" : "Mark as Verified"
                  }
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(localContact.id)}
                  className="btn btn-sm btn-square w-10 h-10 bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleMarkAsVerified}
                  disabled={localContact.verified}
                  className={`btn btn-sm ${
                    localContact.verified
                      ? "btn-success cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
                  }`}
                >
                  {localContact.verified ? "Verified" : "Mark as Verified"}
                </button>
                <button
                  onClick={() => onDelete(localContact.id)}
                  className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
