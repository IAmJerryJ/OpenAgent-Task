import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, Home } from "lucide-react";

function ThankYouPage() {
  return (
    <div className="min-h-fit bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your message has been successfully submitted. We'll get back to you
            within 24 hours.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What happens next?
            </h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We'll review your message and contact details
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Our team will reach out to you within 24 hours
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We'll discuss your requirements and next steps
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/contacts-list"
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Contacts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
