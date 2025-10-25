import { useState, useEffect } from "react";
import { X, User, MessageSquare, CheckCircle } from "lucide-react";

import type { ContactCardProps, InfoField } from "@/types";
import { CONTACT_CARD_INFO_FIELD } from "@/constants/ContactCardInfoField";

import ActionButtons from "./ActionButtons";

function ContactCard({
  contact,
  onClose,
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
    setLocalContact(prev => ({ ...prev, verified: true }));
  };

  const InfoField = ({ icon: Icon, label, value }: InfoField) => (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-gray-400 mt-1" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );

  const renderInfoFields = () => {
    return CONTACT_CARD_INFO_FIELD.map(config => {
      const rawValue = localContact[config.key];
      const value = config.formatter
        ? config.formatter(rawValue as string | number | Date)
        : String(rawValue);

      return (
        <InfoField
          key={config.key}
          icon={config.icon}
          label={config.label}
          value={value}
        />
      );
    });
  };

  const StatusBadge = ({ isVerified }: { isVerified: boolean }) => (
    <div className="flex items-center gap-2 mt-1">
      {isVerified ? (
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
  );

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
              <StatusBadge isVerified={localContact.verified} />
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
            <div className="space-y-4">{renderInfoFields().slice(0, 2)}</div>
            <div className="space-y-4">{renderInfoFields().slice(2, 4)}</div>
          </div>

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
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <ActionButtons
            contactId={localContact.id}
            isVerified={localContact.verified}
            isSmallScreen={isSmallScreen}
            onMarkAsVerified={handleMarkAsVerified}
            onDelete={onDelete}
          />
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
