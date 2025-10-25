import { useState } from "react";
import { Search, X } from "lucide-react";

import { useSmallScreen } from "@/hooks/useSmallScreen";
import type { SearchBarProps } from "@/types";

function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");
  const isSmallScreen = useSmallScreen();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    onClear();
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="flex gap-1 sm:gap-2">
        <input
          type="text"
          placeholder="Search Contacts..."
          className="input input-bordered flex-1 min-w-0"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className={`btn btn-primary ${
            isSmallScreen ? "btn-square" : ""
          } flex-shrink-0`}
          title="Search"
        >
          {isSmallScreen ? <Search size={16} /> : "Search"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={`btn btn-outline ${
            isSmallScreen ? "btn-square" : ""
          } flex-shrink-0`}
          title="Clear"
        >
          {isSmallScreen ? <X size={16} /> : "Clear"}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
