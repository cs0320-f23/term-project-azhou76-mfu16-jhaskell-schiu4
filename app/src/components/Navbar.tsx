import React from "react";

function NavBar() {
  return (
    <ul className="h-20 w-full items-center justify-center bg-gray-200 flex gap-4">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/">All Books</a>
      </li>
      <li>
        <a href="/">Fiction</a>
      </li>
      <li>
        <a href="/">Nonfiction</a>
      </li>
    </ul>
  );
}

export default NavBar;
