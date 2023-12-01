import React from "react";

function Searchbar() {
  return (
    // <div className="inline-flex items-center space-x-2">
    <>
      {" "}
      <input
        type="text"
        className="border rounded-md p-2 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
      />
      <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none">
        Search
      </button>
    </>

    // </div>
  );
}

export default Searchbar;
