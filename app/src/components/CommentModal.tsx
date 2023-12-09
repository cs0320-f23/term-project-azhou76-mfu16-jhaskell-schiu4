import React, { useState, useRef, useEffect } from "react";
import { useFloating, offset, flip } from "@floating-ui/react-dom";

interface CommentModalProps {
  selectedText: string;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  selectedText,
  onClose,
}) => {
  const [comment, setComment] = useState<string>("");
  const floatingRef = useRef<HTMLDivElement>(null);
  const { x, y, strategy, update } = useFloating({
    placement: "right",
    strategy: "fixed",
    middleware: [offset(10), flip()],
  });

  useEffect(() => {
    update();
  }, [selectedText, update]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Comment:", comment); // Handle the comment submission here
    onClose(); // Close the modal
  };

  return (
    <div
      id="floating"
      style={{ position: strategy, bottom: y ?? 0, right: x ?? 0, zIndex: 1000 }}
    >
      <div ref={floatingRef}>
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
