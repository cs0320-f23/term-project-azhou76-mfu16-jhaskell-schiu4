import React, { useEffect, useState } from "react";
import Book from "./components/Book";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
// const books = [
//   {
//     id: 1,
//     imgPath: "1.jpg",
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     genres: ["fantasy", "fiction", "adventure"],
//     favorited: true,
//     description:
//       "Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by Gandalf and the dwarves and embarks on the journey of a lifetime.",
//     comments: {
//       chapter1: [
//         {
//           startIndex: 20,
//           endIndex: 50,
//           content: "This is the first comment on chapter 1",
//         },
//         {
//           startIndex: 60,
//           endIndex: 80,
//           content: "This is the second comment on chapter 1",
//         },
//       ],
//       chapter2: [
//         {
//           startIndex: 20,
//           endIndex: 50,
//           content: "This is the first comment on chapter 2",
//         },
//         {
//           startIndex: 60,
//           endIndex: 80,
//           content: "This is the second comment on chapter 2",
//         },
//       ],
//       chapters: [],
//     },
//   },
//   {
//     id: 2,
//     imgPath: "2.jpg",
//     title: "The Fellowship of the Ring",
//     author: "J.R.R. Tolkien",
//     genres: ["fantasy", "fiction", "adventure"],
//     favorited: true,
//     description:
//       "Frodo Baggins, a hobbit, inherits the One Ring from his uncle, Bilbo Baggins. Frodo must take the Ring to Mount Doom to destroy it, before the Dark Lord Sauron can reclaim it.",
//   },
//   {
//     id: 3,
//     imgPath: "3.jpg",
//     title: "1984",
//     author: "George Orwell",
//     genres: ["dystopian", "political fiction", "science fiction"],
//     favorited: false,
//     description:
//       "Set in a dystopian future where society is ruled by an omnipresent government led by Big Brother, 1984 explores themes of totalitarianism, mass surveillance, and repressive regimentation of all persons and behaviors within society.",
//   },
//   {
//     id: 4,
//     imgPath: "4.jpg",
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genres: ["classic", "historical fiction"],
//     favorited: false,
//     description:
//       "The story, set in the 1930s, follows a young girl named Scout and her brother, Jem, in the sleepy Alabama town of Maycomb. Their father, Atticus Finch, is a lawyer who takes on the case of a black man accused of assaulting a white woman, exploring themes of racial injustice and moral growth.",
//   },
//   {
//     id: 5,
//     imgPath: "5.jpg",
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     genres: ["classic", "romance", "literature"],
//     favorited: false,
//     description:
//       "Set in rural England in the early 19th century, 'Pride and Prejudice' tells the story of the Bennet family, focusing on the relationship between Elizabeth Bennet and Mr. Darcy. The novel explores themes of love, marriage, and societal expectations.",
//   },
//   {
//     id: 6,
//     imgPath: "6.jpg",
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     genres: ["classic", "coming-of-age", "literature"],
//     favorited: false,
//     description:
//       "The novel follows a few days in the life of Holden Caulfield, a troubled teenager who has been expelled from prep school. Disillusioned and alone, he wanders New York City, grappling with issues of identity, belonging, and the loss of innocence.",
//   },
// ];

async function getBooks() {
  try {
    const response = await fetch("http://localhost:8000/api/getbooks"); // Replace with your API endpoint
    const data = await response.json();
    console.log(data);

    const transformedBooks = data.data.map((book: any) => ({
      id: parseInt(book.bookID), // Convert bookID to an integer
      imgPath: book.link,
      title: book.title,
      author: book.author,
      genres: [book.genre], // Convert genre to an array
      favorited: book.favorited,
      description: "No description available.", // Placeholder description
      comments: { chapters: [] }, // Placeholder comments
    }));

    return transformedBooks;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [genre, setGenre] = React.useState("all");
  const [favorites, setFavorites] = React.useState(false);
  const [books, setBooks] = useState([]); // State to store books
  const [shouldUpdate, setShouldUpdate] = useState(false); // State to trigger update

  useEffect(() => {
    // Fetch books when the component mounts or when a specific condition is met
    getBooks().then((fetchedBooks) => {
        setBooks(fetchedBooks);
    });
  }, [shouldUpdate]); // Dependency array with books  

  const filteredBooks = books
    .filter((book: any) => !favorites || book.favorited)
    .filter((book: any) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book: any) => {
      if (genre.toLowerCase() === "all") {
        return true;
      }
      return book.genres.includes(genre.toLowerCase());
    });

  return (
    <div className="flex flex-col h-screen justify-between bg-orange-100">
      <NavBar
        onChange={setGenre}
        setFavorites={setFavorites}
        genre={genre}
        favorites={favorites}
        setGenre={setGenre}
      />

      <div className="flex-grow my-8">
        {/* Main content */}
        <div className="grid grid-cols-4 w-screen h-screen overflow-y-auto">
          {filteredBooks.map((book: any) => {
            return (
              <Book
                id={book.id}
                key={book.id}
                author={book.author}
                imgPath={book.imgPath}
                title={book.title}
                genres={book.genres}
                isFavorited={book.favorited}
                shouldUpdate={shouldUpdate}
                setShouldUpdate={setShouldUpdate}
                // description={book.description}
              />
            );
          })}
        </div>
      </div>

      <SearchBar onChange={setSearchQuery} fixed />
    </div>
  );
}

export default App;
