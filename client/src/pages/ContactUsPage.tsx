import ContactForm from "@/components/ContactForm/ContactForm";
import ContactInfo from "@/components/ContactInfo";

function ContactUsPage() {
  return (
    <div>
      <div className="container mx-auto p-8 sm:p-12 lg:p-20">
        <div className="text-left mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
            Contact us, we love to hear from you
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-1">
            <ContactInfo />
          </div>
          <div className="order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
