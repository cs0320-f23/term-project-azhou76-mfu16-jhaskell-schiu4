import React from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Book from "./Book";
const books = [
  {
    id: 1,
    imgPath: "1.jpg",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genres: ["fantasy", "fiction", "adventure"],
    description:
      "Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by Gandalf and the dwarves and embarks on the journey of a lifetime.",
  },
  {
    id: 2,
    imgPath: "2.jpg",
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genres: ["fantasy", "fiction", "adventure"],
    description:
      "Frodo Baggins, a hobbit, inherits the One Ring from his uncle, Bilbo Baggins. Frodo must take the Ring to Mount Doom to destroy it, before the Dark Lord Sauron can reclaim it.",
  },
  {
    id: 3,
    imgPath: "3.jpg",
    title: "1984",
    author: "George Orwell",
    genres: ["dystopian", "political fiction", "science fiction"],
    description:
      "Set in a dystopian future where society is ruled by an omnipresent government led by Big Brother, 1984 explores themes of totalitarianism, mass surveillance, and repressive regimentation of all persons and behaviors within society.",
  },
  {
    id: 4,
    imgPath: "4.jpg",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genres: ["classic", "historical fiction"],
    description:
      "The story, set in the 1930s, follows a young girl named Scout and her brother, Jem, in the sleepy Alabama town of Maycomb. Their father, Atticus Finch, is a lawyer who takes on the case of a black man accused of assaulting a white woman, exploring themes of racial injustice and moral growth.",
  },
  {
    id: 5,
    imgPath: "5.jpg",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genres: ["classic", "romance", "literature"],
    description:
      "Set in rural England in the early 19th century, 'Pride and Prejudice' tells the story of the Bennet family, focusing on the relationship between Elizabeth Bennet and Mr. Darcy. The novel explores themes of love, marriage, and societal expectations.",
  },
  {
    id: 6,
    imgPath: "6.jpg",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genres: ["classic", "coming-of-age", "literature"],
    description:
      "The novel follows a few days in the life of Holden Caulfield, a troubled teenager who has been expelled from prep school. Disillusioned and alone, he wanders New York City, grappling with issues of identity, belonging, and the loss of innocence.",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />

      <div className="flex-grow">
        {/* Main content */}
        <ul className="flex flex-row overflow-x-auto scrolling-touch items-start">
          {filteredBooks.map(book => {
            return (
              <Book
                id={book.id}
                key={book.id}
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

      <SearchBar onChange={setSearchQuery} />

      
    </div>
  );
}

export default App;
