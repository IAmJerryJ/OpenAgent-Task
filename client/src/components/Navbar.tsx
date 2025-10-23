import { ContactIcon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-base-100/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ContactIcon className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  OpenAgent
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION MENU */}
          <div className="hidden md:flex flex-none">
            <ul className="menu menu-horizontal px-1 gap-8">
              <li>
                <Link to="/" className="hover:bg-base-200 rounded-lg">
                  Contact US
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts-list"
                  className="hover:bg-base-200 rounded-lg"
                >
                  Contacts List
                </Link>
              </li>
            </ul>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              className="btn btn-ghost btn-square"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION MENU */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="menu menu-vertical px-4 py-2 bg-base-100 border-t border-base-content/10">
              <li>
                <Link
                  to="/"
                  className="hover:bg-base-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact US
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts-list"
                  className="hover:bg-base-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacts List
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
