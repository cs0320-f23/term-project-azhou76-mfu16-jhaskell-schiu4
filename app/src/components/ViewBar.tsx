import React from "react";
// type NavBarProps = {
//   onChange: (value: string) => void;
// };
function ViewBar({  }) {
  return (
    <ul className="h-20 w-full items-center justify-center bg-gray-200 flex gap-4 fixed top-0">
      <li>
        <a
          className="hover:cursor-pointer hover:text-purple-600 transition-all duration-150"
          href="/"
        >
          Home
        </a>
      </li>
    </ul>
  );
}

export default ViewBar;
