import React, { useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import ViewBar from "./ViewBar";
import SearchBar from "./Searchbar";
import CommentModal from "./CommentModal";
import { useFloating, offset, flip } from "@floating-ui/react-dom";
import { SelectedText } from "../types/types";
import AccessibilityBar from "./AccessibilityBar";
import Results from "./Results";
import { ChapterJson, Comment } from "../types/types";
import { mockChapterJson } from "../data/mockedData";

type ViewProps = {
  IS_MOCKING_DATA: boolean;
};
function View({ IS_MOCKING_DATA }: ViewProps) {
  const [size, setSize] = useState<number>(2);
  const [searchResults, setSearchResults] = useState<string[][]>([]);

  const textSizes = ["sm", "base", "lg", "2xl"];
  const titleSizes = ["base", "lg", "2xl", "2xl"];

  const { bookId, chapterId } = useParams();
  console.log(bookId, chapterId);
  const [searchValue, setSearchValue] = useState<string>("");
  async function handleSearch(value: string) {
    console.log(value);
    setSearchValue(value);
    const res = await fetch(
      `http://localhost:8000/searchbook?bookId=${bookId}&pat=${value}`
    );
    const data = await res.json();
    console.log("this is the data", data);
    setSearchResults(data);
  }

  async function mockHandleSearch(value: string) {
    console.log(value);
    setSearchValue(value);
  }

  async function mockGetContent(id: string): Promise<ChapterJson> {
    const data = mockChapterJson;
    setChapterJson(data);
    console.log(data);
    return data;
  }

  const REAL_DICTIONARY = {
    handleSearch: handleSearch,
    getContent: getContent,
  };

  const MOCK_DICTIONARY = {
    handleSearch: mockHandleSearch,
    getContent: mockGetContent,
  };

  type Registry = {
    handleSearch: (value: string) => void;
    getContent: (id: string) => Promise<ChapterJson>;
  };

  let registry: Registry;
  if (IS_MOCKING_DATA) {
    registry = MOCK_DICTIONARY;
  } else {
    registry = REAL_DICTIONARY;
  }

  const [selectedText, setSelectedText] = useState<SelectedText>({
    text: "",
    needsCutoff: false,
  });
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  // make sure title, author, and content are all strings and keys

  const [chapterJson, setChapterJson] = useState<ChapterJson>({
    author: "",
    bookID: "",
    comments: [],
    genre: "",
    numChapters: "",
    text: "",
    title: "",
  });

  const handleTextSelection = (event: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      if (selection.toString().length > 50) {
        setSelectedText({ text: selection.toString(), needsCutoff: true });
      } else {
        setSelectedText({ text: selection.toString(), needsCutoff: false });
      }

      setIsCommentOpen(true);
      // Positioning logic for the comment modal
    } else {
      // check if the click was outside the comment modal
      if (
        commentRef.current &&
        !commentRef.current.contains(event.target as Node)
      ) {
        setIsCommentOpen(false);
      }
    }
  };

  const [comment, setComment] = useState<Comment>({
    content: undefined,
    startIndex: undefined,
    endIndex: undefined,
  });

  document.onmouseup = function (): void {
    const selection: Selection | null = window.getSelection();

    if (selection) {
      let start: number = selection.anchorOffset;
      let end: number = selection.focusOffset;

      // Ensure start is always less than end
      if (start > end) {
        [start, end] = [end, start];
      }
      if (selection.anchorNode?.parentElement?.id === "book-content") {
        setComment((currentComment) => ({
          content: currentComment?.content,
          startIndex: start,
          endIndex: end,
        }));
        console.log("Start index: " + start);
        console.log("End index: " + end);
      }
    }
  };

  async function getContent(id: string): Promise<ChapterJson> {
    const res = await fetch(
      `http://localhost:8000/getbook/?bookId=${id}&chapter=chapter${chapterId}`
    );
    // http://localhost:8000/getbook/?bookId=1&chapter=chapter1
    const data: ChapterJson = await res.json();
    setChapterJson(data);
    console.log(data);
    return data;
  }

  function getChapterComments(bookId: string, chapterId: string) {
    const bookContent = chapterJson;

    const comments = bookContent.comments as Comment[];
    return comments;
  }

  useLayoutEffect(() => {
    registry["getContent"](bookId!);
  }, [bookId]);

  return (
    <div
      className="w-screen flex flex-col items-center justify-center bg-orange-100"
      onMouseUp={handleTextSelection}
    >
      <ViewBar />
      {isCommentOpen && (
        <CommentModal
          forwardRef={commentRef}
          bookId={bookId!}
          chapterId={chapterId!}
          comment={comment}
          setComment={setComment}
          selectedText={selectedText}
          onClose={function (): void {
            setIsCommentOpen(false);
          }}
        />
      )}

      <div
        className={`text-${titleSizes[size]} font-bold text-center fixed top-14 w-screen py-4 bg-inherit`}
      >
        {chapterJson["title"]}
      </div>

      <div className="flex w-full justify-end text-black font-merriweather px-40 pt-40 pb-10">
        <AccessibilityBar
          size={size}
          setSize={setSize}
          chapterInfo={chapterJson}
        />
      </div>

      <div className="flex flex-row">
        {/* Book */}
        <div
          className={`text-${textSizes[size]} text-black font-merriweather text-left px-10 mx-auto pb-20 flex-grow`}
        >
          {bookId && <div id="book-content">{chapterJson["text"]}</div>}
        </div>
        {/* Comments */}
        <div className="flex flex-col gap-4 text-black font-merriweather text-left px-10 mx-auto  pt-56 pb-20">
          {getChapterComments(bookId!, "chapter1").map(
            (comment: Comment, index: number) => {
              // const commentText = extractCommentText(
              //   getChapterText(bookId!, "Chapter 1"),
              //   comment.startIndex,
              //   comment.endIndex
              // );
              const commentText = document
                .getElementById("book-content")
                ?.textContent?.slice(comment.startIndex, comment.endIndex);

              return (
                <div
                  key={index}
                  className="flex flex-col transition-all duration-150 bg-white shadow-md rounded-md p-4 w-full"
                >
                  <p className="text-gray-600 text-sm">{commentText}</p>
                  <p className="mt-2">{comment.content}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
      <Results searchValue={searchValue} searchResults={searchResults} />
      <SearchBar fixed onChange={registry["handleSearch"]} />
    </div>
  );
}

export default View;
