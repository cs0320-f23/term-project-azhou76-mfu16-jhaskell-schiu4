import React from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="h-20 w-full items-center justify-center bg-gray-200 flex">
        <Navbar />
      </div>

      <div className="flex-grow">{/* Main content */}</div>

      <div className="h-20 w-full items-center justify-center bg-gray-200 flex">
        <Searchbar />
      </div>
    </div>
  );
}

export default App;
