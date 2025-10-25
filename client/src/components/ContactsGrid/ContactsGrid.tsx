import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  httpDeleteContact,
  httpGetContacts,
  httpVerifyContact,
} from "@/api/contacts";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import type { Contact } from "@/types";

import ContactsGridPagination from "./ContactsGridPagination";
import ContactCard from "./ContactCard";
import SearchBar from "./SearchBar";
import ContactsGridTable from "./ContactsGridTable";

function ContactsGrid() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useSmallScreen();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactCard, setShowContactCard] = useState(false);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        const itemsPerPage = isSmallScreen ? 5 : 10;
        const response = await httpGetContacts(
          currentPage,
          itemsPerPage,
          searchTerm
        );
        setContacts(response.contacts);
        setPagination(response.pagination);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error && "response" in err
            ? (err as { response?: { data?: { error?: string } } }).response
                ?.data?.error
            : "Failed to load contacts";
        toast.error(errorMessage || "Failed to load contacts");
        console.error("Error loading contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [currentPage, isSmallScreen, searchTerm]);

  const handleMarkAsVerified = async (id: number) => {
    try {
      const updatedContact = await httpVerifyContact(id);
      setContacts(prev =>
        prev.map(contact => (contact.id === id ? updatedContact : contact))
      );
      toast.success("Contact verified successfully!");
    } catch (err: unknown) {
      console.error("Error verifying contact:", err);
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data
              ?.error
          : "Failed to verify contact";
      toast.error(errorMessage || "Failed to verify contact");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await httpDeleteContact(id);

      if (selectedContact && selectedContact.id === id) {
        setShowContactCard(false);
        setSelectedContact(null);
      }

      const itemsPerPage = isSmallScreen ? 5 : 10;
      const response = await httpGetContacts(
        currentPage,
        itemsPerPage,
        searchTerm
      );
      setContacts(response.contacts);
      setPagination(response.pagination);

      toast.success("Contact deleted successfully!");
    } catch (err: unknown) {
      console.error("Error deleting contact:", err);
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data
              ?.error
          : "Failed to delete contact";
      toast.error(errorMessage || "Failed to delete contact");
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleInfoClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContactCard(true);
  };

  const handleCloseContactCard = () => {
    setShowContactCard(false);
    setSelectedContact(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SearchBar
        onSearch={handleSearch}
        onClear={handleClearSearch}
        currentSearchTerm={searchTerm}
      />

      <ContactsGridTable
        contacts={contacts}
        isSmallScreen={isSmallScreen}
        onInfoClick={handleInfoClick}
        onMarkAsVerified={handleMarkAsVerified}
        onDelete={handleDelete}
      />

      {pagination.totalPages > 1 && (
        <div className="mt-6">
          <ContactsGridPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={goToPage}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
            isSmallScreen={isSmallScreen}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
          />
        </div>
      )}

      {showContactCard && selectedContact && (
        <ContactCard
          contact={selectedContact}
          onClose={handleCloseContactCard}
          onMarkAsVerified={handleMarkAsVerified}
          onDelete={handleDelete}
          isSmallScreen={isSmallScreen}
        />
      )}
    </div>
  );
}

export default ContactsGrid;
