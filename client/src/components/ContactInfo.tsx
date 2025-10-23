function ContactInfo() {
  return (
    <div>
      <div className="space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg leading-relaxed text-gray-700">
          Welcome to OpenAgent. We've been around since 2013, and our vision is
          to make it easy for people to buy, sell and own property.
        </p>

        <p className="text-base sm:text-lg text-gray-700">
          Here are the different ways you can contact us
        </p>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold underline mb-2 sm:mb-3 text-gray-800">
              Contact Us Details
            </h3>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm sm:text-base text-gray-600">
                <strong className="text-gray-800">Phone:</strong> 13 24 34
              </p>
              <p className="text-sm sm:text-base text-gray-600 break-all">
                <strong className="text-gray-800">Email:</strong>{" "}
                support@openagent.com.au
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold underline mb-2 sm:mb-3 text-gray-800">
              Postal Address:
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              PO Box 419, Alexandria NSW 1435
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold underline mb-2 sm:mb-3 text-gray-800">
              Contact centre hours of operation
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Monday - Friday 8:30 - 5:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
