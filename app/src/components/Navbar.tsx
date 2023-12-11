import React from "react";
type NavBarProps = {
  onChange: (value: string) => void;
  setFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  genre: string;
  favorites: boolean;
};
function NavBar({
  onChange,
  setFavorites,
  genre,
  favorites,
  setGenre,
}: NavBarProps) {
  console.log(favorites);

  return (
    <ul className="h-14 w-full items-center justify-center bg-white flex gap-4 p-6 font-semibold text-blue-500 [& *]:transition-all [& *]:duration-450 fixed top-0">
      <li>
        <div
          className={`hover:cursor-pointer hover:text-purple-400 transition-all duration-150  ${
            favorites ? "text-purple-600" : ""
          }`}
          onClick={e => {
            setGenre("all");
            setFavorites(true);
          }}
        >
          Favorites
        </div>
      </li>
      <li>
        <div
          className={`hover:cursor-pointer hover:text-purple-400 transition-all duration-150 ${
            genre === "all" && !favorites ? "text-purple-600" : ""
          }`}
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
          className={`hover:cursor-pointer hover:text-purple-400 transition-all duration-150 ${
            genre === "fiction" ? "text-purple-600" : ""
          }`}
          onClick={e => {
            onChange("fiction");
            setFavorites(false);
          }}
        >
          Fiction
        </div>
      </li>
      <li>
        <div
          className={`hover:cursor-pointer hover:text-purple-400 transition-all duration-150 ${
            genre === "nonfiction" ? "text-purple-600" : ""
          }`}
          onClick={e => {
            onChange("nonfiction");
            setFavorites(false);
          }}
        >
          Nonfiction
        </div>
      </li>
    </ul>
  );
}

export default NavBar;
