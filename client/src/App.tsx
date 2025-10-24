import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ContactUsPage from "./pages/ContactUsPage";
import ContactsListPage from "./pages/ContactsListPage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme="light"
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<ContactUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/contacts-list" element={<ContactsListPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
