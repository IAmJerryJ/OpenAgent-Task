import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { contactsApi } from "../api";
import type { Contact } from "../types";
import toast from "react-hot-toast";
import ContactsGridPagination from "./ContactsGrid/ContactsGridPagination";
import ActionButtons from "./ContactsGrid/ActionButtons";
import ContactCard from "./ContactsGrid/ContactCard";

function ContactsGrid() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactCard, setShowContactCard] = useState(false);

  const formatSydneyTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        const itemsPerPage = isSmallScreen ? 5 : 10;
        const response = await contactsApi.getContacts(
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
      const updatedContact = await contactsApi.verifyContact(id);
      setContacts((prev) =>
        prev.map((contact) => (contact.id === id ? updatedContact : contact))
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
      await contactsApi.deleteContact(id);

      if (selectedContact && selectedContact.id === id) {
        setShowContactCard(false);
        setSelectedContact(null);
      }

      const itemsPerPage = isSmallScreen ? 5 : 10;
      const response = await contactsApi.getContacts(
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
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
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search Contacts..."
            className="input input-bordered flex-1"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="btn btn-outline"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="overflow-x-auto">
        <table
          className="table table-zebra table-fixed w-full border border-gray-300"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th
                className="text-center sticky left-0 bg-gray-200 z-10 border border-gray-300 px-4 py-3"
                style={{ width: "50px" }}
              >
                Info
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "150px" }}
              >
                First Name
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "150px" }}
              >
                Last Name
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "250px" }}
              >
                Email
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "200px" }}
              >
                Phone
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "300px" }}
              >
                Note
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "200px" }}
              >
                Created At
              </th>
              <th
                className="text-left border border-gray-300 px-4 py-3"
                style={{ width: "200px" }}
              >
                Updated At
              </th>
              <th
                className="text-center sticky right-0 bg-gray-200 z-10 whitespace-nowrap px-4 border border-gray-300"
                style={{
                  width: isSmallScreen ? "120px" : "250px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: Contact) => (
              <tr key={contact.id} className="hover">
                <td
                  className="text-center sticky left-0 bg-gray-200 z-10 border border-gray-300 px-4 py-3"
                  style={{ width: "20px" }}
                >
                  <button
                    onClick={() => handleInfoClick(contact)}
                    className="btn btn-sm btn-link btn-info w-5 h-5 p-0 hover:text-blue-600"
                    title="View Details"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </td>
                <td
                  className="font-medium border border-gray-300 px-4 py-3 truncate"
                  style={{ width: "120px" }}
                  title={contact.firstName}
                >
                  {contact.firstName}
                </td>
                <td
                  className="border border-gray-300 px-4 py-3 truncate"
                  style={{ width: "120px" }}
                  title={contact.lastName}
                >
                  {contact.lastName}
                </td>
                <td
                  className="text-sm text-gray-600 border border-gray-300 px-4 py-3 truncate"
                  style={{ width: "200px" }}
                  title={contact.email}
                >
                  {contact.email}
                </td>
                <td
                  className="text-sm border border-gray-300 px-4 py-3 truncate"
                  style={{ width: "150px" }}
                  title={contact.phone}
                >
                  {contact.phone}
                </td>
                <td
                  className="text-sm truncate border border-gray-300 px-4 py-3"
                  style={{ width: "200px" }}
                  title={contact.note}
                >
                  {contact.note}
                </td>
                <td
                  className="text-sm border border-gray-300 px-4 py-3"
                  style={{ width: "180px" }}
                  title={formatSydneyTime(contact.createdAt)}
                >
                  {formatSydneyTime(contact.createdAt)}
                </td>
                <td
                  className="text-sm border border-gray-300 px-4 py-3"
                  style={{ width: "180px" }}
                  title={formatSydneyTime(contact.updatedAt)}
                >
                  {formatSydneyTime(contact.updatedAt)}
                </td>
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
                    onMarkAsVerified={handleMarkAsVerified}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-6">
          <ContactsGridPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={goToPage}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
            isSmallScreen={isSmallScreen}
          />
        </div>
      )}

      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
        {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)}{" "}
        of {pagination.totalItems} contacts
      </div>

      {showContactCard && selectedContact && (
        <ContactCard
          contact={selectedContact}
          onClose={handleCloseContactCard}
          formatSydneyTime={formatSydneyTime}
          onMarkAsVerified={handleMarkAsVerified}
          onDelete={handleDelete}
          isSmallScreen={isSmallScreen}
        />
      )}
    </div>
  );
}

export default ContactsGrid;
