import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { mockedData } from "./data/mockedData";
const IS_MOCKING_DATA = true;
test("renders nav bar text", async () => {
  render(<App IS_MOCKING_DATA={IS_MOCKING_DATA} />);
  await waitFor(() => {
    // check for all, favorites, Fiction, Nonfiction
    const textsToCheck = ["All", "Favorites", "Fiction", "Nonfiction"];

    // Loop through the array and check each text
    textsToCheck.forEach(text => {
      console.log(new RegExp(text, "i"));
      const element = screen.getByText(new RegExp(text));
      expect(element).toBeInTheDocument();
    });

    const bookElements = screen.getAllByTestId("BookComponent");

    // Check if the length matches the number of books in mockedData
    expect(bookElements.length).toBe(mockedData.data.length);
  });
});

test("renders learn react link with mocking data", () => {
  render(<App IS_MOCKING_DATA={IS_MOCKING_DATA} />);
  const linkElement = screen.getByText(/favorites/i);

  expect(linkElement).toBeInTheDocument();
});
