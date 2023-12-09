import React, { useState, useRef, useEffect } from "react";
import { useFloating, offset, flip } from "@floating-ui/react-dom";

interface CommentModalProps {
  selectedText: string;
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

  const { x, y, strategy, update } = useFloating({
    placement: "right",
    strategy: "fixed",
    middleware: [offset(10), flip()],
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Comment:", comment); // Handle the comment submission here
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

  return (
    <div
      id="floating"
      style={{
        position: strategy,
        bottom: y ?? 0,
        right: x ?? 0,
        zIndex: 1000,
      }}
      ref={ref}
    >
      <div ref={floatingRef} id="comment-box" onFocus={handleFocus} onBlur={handleBlur}>
        <p>Selected Text: {selectedText}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Enter your comment"
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
