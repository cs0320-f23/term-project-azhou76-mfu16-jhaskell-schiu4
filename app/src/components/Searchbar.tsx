import React from "react";

interface SearchBarProps {
  onChange: (value: string) => void;
  fixed?: boolean;
}

window.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
    // Check for Ctrl+F or Cmd+F (for Mac)
    e.preventDefault();
    console.log(document.getElementById("search"));
    document.getElementById("search")!.focus();
  } else if (e.keyCode === 27) {
    // Esc key
    document.getElementById("search")?.blur(); // Defocuses the currently focused element
  }
});
function SearchBar({ onChange, fixed }: SearchBarProps) {
  return (
    // <div className="inline-flex items-center space-x-2">
    <div
      className={`h-14 w-screen rounded-lg items-center justify-center bg-gray-200 flex ${
        fixed && "bottom-0 fixed"
      }  mx-auto`}
    >
      <div className="grid place-items-center h-full w-14 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="border rounded-md p-2 focus:outline-none peer h-full w-full outline-none text-lg text-gray-700 pr-2"
        id="search"
        placeholder="Search for a book..."
        onChange={e => onChange(e.target.value)}
      />
      {/* <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none">
        Search
      </button> */}
    </div>

    // </div>
  );
}

export default SearchBar;
