import React from "react";
import { useParams } from "react-router-dom";
type ResultsProps = {
  searchValue: string;
  searchResults: Record<number, string[]>;
};

function Results({ searchValue, searchResults }: ResultsProps) {
     const { bookId, chapterId } = useParams();

  console.log("hello");
  console.log("search value", searchValue);
  //   alert("search value" + searchValue);
  return (
    <div className="fixed bottom-14 inset-x-0 bg-white p-4 shadow-md z-10">
      <h1 className="text-xl text-gray-700 font-bold">
        Query: <span className="font-normal">{searchValue}</span> <br></br>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr className="[&_*]:border [&_*]:border-gray-400 [&_*]:p-2">
              <th>Chapter</th>
              <th>Character Number</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody className="[&_*]:border [&_*]:border-gray-400 [&_*]:p-2">
            {Object.entries(searchResults).map(([chapter, entries]) => (
              <React.Fragment key={parseInt(chapter)}>
                {entries.map(([charNum, result], index) => (
                  <tr
                    key={index}
                    onClick={e => {
                      e.preventDefault();
                      window.location.href = `/media/${bookId}/${chapter}`;
                    }}
                    className="hover:cursor-pointer hover:bg-slate-200 transition-all"
                  >
                    {/* <a href={`/media/${chapter}`} className="hover:cursor-pointer border-none p-0"> */}
                    {index === 0 && <td rowSpan={entries.length}>{chapter}</td>}
                    <td>{charNum}</td>
                    <td>{result}</td>
                    {/* </a> */}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </h1>
    </div>
  );
}

export default Results;
