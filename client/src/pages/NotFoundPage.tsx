import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-gray-400">404</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
