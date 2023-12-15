import React, { useState } from "react";
import magnifyPlus from "../images/magnifyPlus.svg";
import magnifyMinus from "../images/magnifyMinus.svg";
import chevronRight from "../images/chevron-right.svg";
import chevronLeft from "../images/chevron-left.svg";
import { ChapterJson } from "../types/types";
import { Link, Route, Router, useNavigate, useParams } from "react-router-dom";
import View from "./View";

type AccessibilityBarProps = {
  size: number;
  setSize: (size: number) => void;
  chapterInfo: ChapterJson;
};



function AccessibilityBar({ size, setSize, chapterInfo }: AccessibilityBarProps) {
  const [favorited, setFavorited] = useState(false);
  const { bookId, chapterId } = useParams();

  return (
    <div className="flex flex-row align-top">
      <button onClick={() => setSize(size + 1)} disabled={size >= 3}>
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
      {/* <button onClick={() => getLeftPage()} disabled={chapterId === "1"}>
      <img src={chevronLeft} alt="left arrow" height={30} width={30}></img>
      </button> */}
        <div>
    {chapterId !== "1" ? (
      <a href={`/media/${bookId}/${parseInt(chapterId ? chapterId : "1") - 1}`}>
        <img src={chevronLeft} alt="left arrow" height={30} width={30} />
      </a>
    ) : (
      <img src={chevronLeft} alt="left arrow" height={30} width={30} style={{ opacity: 0.5 }} />
    )}
  </div>
  {
    parseInt(chapterId ? chapterId : "1") < parseInt(chapterInfo.numChapters) ? (
      <a href={`/media/${bookId}/${parseInt(chapterId ? chapterId : "1") + 1}`}>
        <img src={chevronRight} alt="right arrow" height={30} width={30} />
      </a>
    ) : (
      <img src={chevronRight} alt="right arrow" height={30} width={30} style={{ opacity: 0.5 }}/>
    )
  }
    </div>
  );
}

export default AccessibilityBar;