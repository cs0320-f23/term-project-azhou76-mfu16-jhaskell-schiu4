import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Book from "./components/Book";
import Results from "./components/Results";
import { mockedData } from "./data/mockedData";
import { BookType, ResponseType } from "./types/types";
const IS_MOCKING_DATA = true;

const mockedRegistry = {
  getBooks: getMockedBooks,
};

const realRegistry = {
  getBooks: getBooks,
};



async function getMockedBooks() {
  const data = mockedData;
  const transformedBooks = data.data.map((book) => ({
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
}

async function getBooks() {
  try {
    const response = await fetch("http://localhost:8000/api/getbooks"); // Replace with your API endpoint
    const data: ResponseType = await response.json();
    console.log(data);

    const transformedBooks = data.data.map((book) => ({
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
type AppProps = {
  IS_MOCKING_DATA: boolean;
}
function App({IS_MOCKING_DATA}: AppProps) {
  let registry: Record<string, Function>;
  if (IS_MOCKING_DATA) {
    registry = mockedRegistry;
  } else {
    registry = realRegistry;
  }

  const [searchQuery, setSearchQuery] = React.useState("");
  const [genre, setGenre] = React.useState("all");
  const [favorites, setFavorites] = React.useState(false);
  const [books, setBooks] = useState<BookType[]>([]); // State to store books
  const [shouldUpdate, setShouldUpdate] = useState(false); // State to trigger update

  useEffect(() => {
    // Fetch books when the component mounts or when a specific condition is met
    registry["getBooks"]().then((fetchedBooks: BookType[]) => {
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
