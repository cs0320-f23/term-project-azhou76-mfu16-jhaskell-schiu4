import React from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Book from "./Book";
const books = [
  {
    imgPath: "1.jpg",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genres: ["fantasy", "fiction", "adventure"],
    description:
      "Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by Gandalf and the dwarves and embarks on the journey of a lifetime.",
  },
  {
    imgPath: "2.jpg",
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genres: ["fantasy", "fiction", "adventure"],
    description:
      "Frodo Baggins, a hobbit, inherits the One Ring from his uncle, Bilbo Baggins. Frodo must take the Ring to Mount Doom to destroy it, before the Dark Lord Sauron can reclaim it.",
  },
];
function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />

      <div className="flex-grow">
        {/* Main content */}
        <ul className="flex flex-row">
          {books.map((book) => {
            return (
              <Book
                key={book.title}
                author={book.author}
                imgPath={book.imgPath}
                title={book.title}
                genres={book.genres}
                description={book.description}
              />
            );
          })}
        </ul>
      </div>

      <SearchBar />
    </div>
  );
}

export default App;
