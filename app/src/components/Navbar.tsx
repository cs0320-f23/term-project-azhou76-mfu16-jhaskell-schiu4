import React from "react";
type NavBarProps = {
  onChange: (value: string) => void;
  setFavorites: React.Dispatch<React.SetStateAction<boolean>>;
};
function NavBar({ onChange, setFavorites }: NavBarProps) {
  return (
    <ul className="h-14 w-full items-center justify-center bg-gray-200 flex gap-4">
      <li>
        <div
          className="hover:cursor-pointer hover:text-purple-600 transition-all duration-150"
          onClick={e => setFavorites(true)}
        >
          Favorites
        </div>
        <div
          className="hover:cursor-pointer hover:text-purple-600 transition-all duration-150"
          onClick={e => {
            onChange("all");
            setFavorites(false);
          }}
        >
          All
        </div>
      </li>
      <li>
        <div
          className="hover:cursor-pointer hover:text-purple-600 transition-all duration-150"
          onClick={e => onChange("fiction")}
        >
          Fiction
        </div>
      </li>
      <li>
        <div
          className="hover:cursor-pointer hover:text-purple-600 transition-all duration-150"
          onClick={e => onChange("nonfiction")}
        >
          Nonfiction
        </div>
      </li>
    </ul>
  );
}

export default NavBar;
