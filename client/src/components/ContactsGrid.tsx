import { useState, useEffect } from "react";
import { CheckCircle, Trash2 } from "lucide-react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  verified: boolean;
}

const sampleData: Contact[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    note: "Interested in property investment",
    verified: false,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    note: "Looking for first home",
    verified: true,
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    phone: "555-123-4567",
    note: "Commercial property inquiry",
    verified: false,
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown@example.com",
    phone: "444-555-6666",
    note: "First-time buyer looking for guidance",
    verified: false,
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Wilson",
    email: "charlie.wilson@example.com",
    phone: "777-888-9999",
    note: "Investment property portfolio expansion",
    verified: true,
  },
  {
    id: 6,
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@example.com",
    phone: "333-444-5555",
    note: "Looking for rental property investment opportunitiessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    verified: false,
  },
];

function ContactsGrid() {
  const [contacts, setContacts] = useState<Contact[]>(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const itemsPerPage = isSmallScreen ? 5 : 10;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMarkAsVerified = (id: number) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, verified: true } : contact
      )
    );
  };

  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = contacts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table
          className="table table-zebra table-fixed w-full border border-gray-300"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
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
            {currentContacts.map((contact) => (
              <tr key={contact.id} className="hover">
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
                  className="text-right sticky right-0 bg-gray-200 z-10 whitespace-nowrap px-4 border border-gray-300"
                  style={{
                    width: isSmallScreen ? "120px" : "250px",
                  }}
                >
                  <div className="flex gap-2 justify-between">
                    {isSmallScreen ? (
                      <>
                        <button
                          onClick={() => handleMarkAsVerified(contact.id)}
                          disabled={contact.verified}
                          className={`btn btn-sm btn-square w-10 h-10 ${
                            contact.verified
                              ? "btn-success cursor-not-allowed"
                              : "btn-primary"
                          }`}
                          title={
                            contact.verified ? "Verified" : "Mark as Verified"
                          }
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="btn btn-sm btn-square btn-error w-10 h-10"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleMarkAsVerified(contact.id)}
                          disabled={contact.verified}
                          className={`btn btn-sm w-32 ${
                            contact.verified
                              ? "btn-success cursor-not-allowed"
                              : "btn-primary"
                          }`}
                        >
                          {contact.verified ? "Verified" : "Mark as Verified"}
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="btn btn-sm btn-error w-20"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline"
          >
            Next
          </button>
        </div>
      )}

      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {startIndex + 1} to {Math.min(endIndex, contacts.length)} of{" "}
        {contacts.length} contacts
      </div>
    </div>
  );
}

export default ContactsGrid;
