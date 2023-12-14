import React, { useState } from "react";
import magnifyPlus from "../images/magnifyPlus.svg";
import magnifyMinus from "../images/magnifyMinus.svg";

type AccessibilityBarProps = {
  size: number;
  setSize: (size: number) => void;
};

function AccessibilityBar({ size, setSize }: AccessibilityBarProps) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="flex flex-row align-top">
      <button onClick={() => setSize(size + 1)} disabled={size >= 4}>
        <img
          src={magnifyPlus}
          alt="magnifying glass"
          height={30}
          width={30}
        ></img>
      </button>
      <button onClick={() => setSize(size - 1)} disabled={size <= 0}>
        <img src={magnifyMinus} alt="minify glass" height={30} width={30}></img>
      </button>
    </div>
  );
}

export default AccessibilityBar;
