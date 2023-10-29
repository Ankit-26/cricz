import { useEffect, useState } from "react";
import { debounce } from "../utils/functions";

function SearchField({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: Function;
}) {
  const debouncedSearch = debounce(onSearch, 1000);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let input = window.localStorage.getItem("searchInp");
    if (input) {
      setSearchInput(input);
    }
  }, []);

  return (
    <div className="max-w-lg w-[18rem] mx-auto flex-1">
      <div className="relative flex items-center w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <input
          value={searchInput}
          className="h-full w-full outline-none text-sm text-gray-700 pr-1 pl-2"
          type="text"
          id="search"
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            debouncedSearch(e.target.value);
            setSearchInput(e.target.value);
            window.localStorage.setItem("searchInp", e.target.value);
          }}
        />
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SearchField;
