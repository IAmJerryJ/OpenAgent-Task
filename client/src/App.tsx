import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactUsPage from "./pages/ContactUsPage";
import ContactsListPage from "./pages/ContactsListPage";

function App() {
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme="light"
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<ContactUsPage />} />
        <Route path="/contacts-list" element={<ContactsListPage />} />
      </Routes>
    </div>
  );
}

export default App;
