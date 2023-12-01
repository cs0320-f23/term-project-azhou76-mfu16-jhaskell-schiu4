import React from "react";

function SearchBar() {
  return (
    // <div className="inline-flex items-center space-x-2">
       <div className="h-20 w-full items-center justify-center bg-gray-200 flex">
      {" "}
      <input
        type="text"
        className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        placeholder="Search for a book..."
      />
      <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none">
        Search
      </button>
    </div>

    // </div>
  );
}

export default SearchBar;
