import React, { useState, useRef, useEffect } from "react";
import { useFloating, offset, flip } from "@floating-ui/react-dom";
import { SelectedText } from "../types/types";

interface CommentModalProps {
  selectedText: SelectedText;
  onClose: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

const CommentModal: React.FC<CommentModalProps> = ({
  selectedText,
  onClose,
  ref,
}) => {
  const [comment, setComment] = useState<string>("");
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

  function sendComment(comment: string) {
    fetch(`http://localhost:8000/sendcomment/content=${comment}`, {});
    // TODO: finish this method for sending comments to database
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
      ref={ref}
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
            value={comment}
            onChange={e => setComment(e.target.value)}
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
