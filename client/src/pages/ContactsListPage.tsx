import ContactsGrid from "../components/ContactsGrid";

function ContactsListPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Contacts List
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <ContactsGrid />
      </div>
    </div>
  );
}

export default ContactsListPage;
