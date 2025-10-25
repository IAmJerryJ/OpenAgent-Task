import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { httpCreateContact } from "@/api/contacts";
import {
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/validation";
import { CONTACT_FORM_FIELDS } from "@/constants/ContactFormFields";

import FloatingLabelInput from "./FloatingLabelInput";

function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const fieldLabels: Record<keyof ContactFormData, string> = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone number",
    message: "Message",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = validateContactForm(formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      setLoading(false);

      const errors = validation.errors || {};
      Object.entries(errors).forEach(([field, message]) => {
        if (message) {
          const fieldLabel =
            fieldLabels[field as keyof ContactFormData] || field;
          toast.error(`${fieldLabel}: ${message}`);
        }
      });
      return;
    }

    try {
      await httpCreateContact({
        firstName: validation.data!.firstName,
        lastName: validation.data!.lastName,
        email: validation.data!.email,
        phone: validation.data!.phone,
        note: validation.data!.message,
      });

      toast.success("Contact submitted successfully! We'll be in touch soon.");
      navigate("/thank-you");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data
              ?.error
          : "Failed to submit contact form";
      toast.error(errorMessage || "Failed to submit contact form");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-sm p-4 sm:p-4 lg:p-8">
      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg text-gray-700">
          Fill in your details and we'll be in touch right away.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {CONTACT_FORM_FIELDS.map(field => (
            <FloatingLabelInput
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              required={field.required}
              error={errors[field.name]}
              rows={field.rows}
            />
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 uppercase tracking-wide text-sm sm:text-base shadow-sm hover:shadow-md"
          >
            {loading ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
