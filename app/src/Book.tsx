// create boilerplate for Book component
import React, { useState } from "react";
interface BookProps {
  imgPath: string;
  title: string;
  author: string;
  description?: string;
  genres?: string[];
}
// add id
function Book({
  imgPath,
  title,
  author,
  description = "Description",
  genres = ["fantasy, fiction, romance"],
}: BookProps) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="card rounded-md bg-white w-80 p-4 flex-shrink-0 flex flex-col hover:shadow-2xl my-12 transition-all cursor-pointer shadow-sm">
      <a href={`/media/${title}`}>
        <img
          src={imgPath}
          alt=""
          className="img-div rounded-md h-96 w-full object-cover object-center"
        />
        {/* <h1 className="text-2xl font-medium mb-1 mt-1">{title}</h1> */}
        {/* <p className="text-gray-500 text-sm font-light flex-grow overflow-scroll">
          {description}
        </p> */}
      </a>

      <hr className="my-4" />
      <div
        className="favorites flex flex-row gap-2"
        onClick={() => setFavorited(!favorited)}
      >
        {!favorited && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2196F3"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-blue-500">add to favorites</p>
          </>
        )}

        {favorited && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#2196F3"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-blue-500">added to favorites</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Book;
