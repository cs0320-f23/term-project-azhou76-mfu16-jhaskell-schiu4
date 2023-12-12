import React from "react";
// type NavBarProps = {
//   onChange: (value: string) => void;
// };
function ViewBar({  }) {
  
  return (
    <ul className="h-14 w-full items-center justify-center bg-white flex gap-4 p-6 font-semibold text-blue-500 [& *]:transition-all [& *]:duration-450 fixed top-0">
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
