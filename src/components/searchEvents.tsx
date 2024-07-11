import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchEventProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const SearchEvent: React.FC<SearchEventProps> = ({
  searchTerm,
  handleSearch,
  setSearchTerm,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="relative flex items-center" ref={searchRef}>
      <div className="block md:hidden cursor-pointer" onClick={toggleSearch}>
        <FaSearch className="text-green-700 text-xl" />
      </div>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search..."
          className={`px-2 py-1 border border-green-400 rounded-2xl text-sm text-green-700 placeholder-green-700 outline-none focus:border-green-400 md:w-48 ${
            isSearchOpen ? "block" : "hidden"
          } md:block`}
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchEvent;
