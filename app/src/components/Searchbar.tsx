import React from "react";

interface SearchBarProps {
  onChange: (value: string) => void;
  fixed?: boolean;
}


function SearchBar({ onChange, fixed }: SearchBarProps) {
  return (
    // <div className="inline-flex items-center space-x-2">
    <div className={`h-20 w-full items-center justify-center bg-gray-200 flex ${fixed && "bottom-0 fixed"}`}>
      {" "}
      <input
        type="text"
        className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        placeholder="Search for a book..."
        onChange={e => onChange(e.target.value)}
      />
      <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none">
        Search
      </button>
    </div>

    // </div>
  );
}

export default SearchBar;
