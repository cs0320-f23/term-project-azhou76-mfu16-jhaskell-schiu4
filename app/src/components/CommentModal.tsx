import React, { useState, useRef, useEffect } from "react";
import { useFloating, offset, flip } from "@floating-ui/react-dom";
import { SelectedText } from "../types/types";
import { Comment } from "./types/types";
interface CommentModalProps {
  selectedText: SelectedText;
  onClose: () => void;
  comment: Comment;
  chapterId: string;
  bookId: string;
  forwardRef: React.RefObject<HTMLDivElement>;
  setComment: React.Dispatch<React.SetStateAction<Comment>>;
}

const CommentModal: React.FC<CommentModalProps> = ({
  selectedText,
  onClose,
  forwardRef,
  comment,
  chapterId,
  bookId,
  setComment,
}) => {
  const floatingRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { x, y, strategy, update, refs, floatingStyles } = useFloating({
    placement: "right",
    strategy: "fixed",
    middleware: [offset(10)],
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!comment) {
      onClose(); // Close the modal if there is no comment
    }
  };

  useEffect(() => {
    update();
  }, [selectedText, update]);

  /**
   * Function for sending and storing comments in db
   * @param content
   * @param startIndex
   * @param endIndex
   */
  async function sendComment({ content, startIndex, endIndex }: Comment) {
    // log all params
    console.log("Content:", content);
    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    console.log("Chapter ID:", chapterId);
    console.log("Book ID:", bookId);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startIndex: startIndex + "",
        endIndex: endIndex + "",
        comment: content,
        chapter: "chapter" + chapterId,
        bookID: bookId + "",
      }),
    };
    const res = await fetch(`http://localhost:8000/addcomment`, requestOptions);
    // make sure res is valid
    if (res.ok && res.status === 200) {
      const json = await res.json();
      console.log(json);
    } else {
      console.log("Error sending comment");
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Comment:", comment); // Handle the comment submission here
    sendComment(comment);
    onClose(); // Close the modal
  };

  let savedRange: Range | null = null;

  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    if (selection!.rangeCount > 0) {
      savedRange = selection!.getRangeAt(0);
    }
  });
  useEffect(() => {
    const commentBox = document.getElementById("comment-box");
    commentBox!.addEventListener("focus", () => {
      console.log(savedRange);
      if (savedRange) {
        setTimeout(() => {
          const selection = window.getSelection();
          selection!.removeAllRanges();
          selection!.addRange(savedRange!);
        }, 0);
      }
    });
  }, []);

  console.log("x:", x);
  console.log("y:", y);
  console.log("floatingStyles:", floatingStyles);
  console.log("refs:", refs);

  return (
    <div
      id="floating"
      style={{
        position: strategy,
        top: "50%",
        transform: "translateY(-50%)",
        left: 50,
        zIndex: 1000,
      }}
      ref={forwardRef}
    >
      <div
        ref={floatingRef}
        id="comment-box"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex flex-col transition-all duration-150 bg-white shadow-md rounded-md p-4 w-96"
      >
        <button
          className="absolute top-2 right-4 hover:cursor-pointer text-red-700"
          onClick={onClose}
        >
          X
        </button>
        <p>
          Selected Text:{" "}
          {selectedText.needsCutoff
            ? selectedText.text.substring(0, 50) + "..."
            : selectedText.text}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-15">
          <textarea
            value={comment.content}
            onChange={(e) =>
              setComment((currentComment: Comment | undefined) => {
                return {
                  content: e.target.value,
                  startIndex: currentComment?.startIndex,
                  endIndex: currentComment?.endIndex,
                };
              })
            }
            className="focus:outline-none focus:ring-2 focus:border-transparent border border-gray-300 rounded-md p-2 h-40 resize-none"
            placeholder="Enter your comment"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
