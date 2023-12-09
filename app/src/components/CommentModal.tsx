import React, { useState, useEffect } from "react";
import Modal from "react-modal";

type CommentModalProps = {
    isOpen: boolean;
    position: { x: number; y: number };
    onRequestClose: () => void;
    onSubmit: (comment: string) => void;
    };
const CommentModal = ({ isOpen, position, onRequestClose, onSubmit }: CommentModalProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
    onRequestClose();
  };

  const modalStyle = {
    content: {
      top: `${position.y}px`,
      left: `${position.x}px`,
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -100%)", // Adjust to position above the selection
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle}>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={handleSubmit}>Submit Comment</button>
    </Modal>
  );
};

export default CommentModal;
