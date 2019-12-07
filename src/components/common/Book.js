import React from "react";
import { update } from "../../utils/BooksAPI";

export const Book = ({
  imageLinks = {},
  title,
  authors = [],
  id,
  shelf,
  updateLocalShelf
}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.thumbnail})`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={shelf || "none"}
            onChange={e => {
              updateLocalShelf({ id }, e.target.value);
              update({ id }, e.target.value);
            }}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};
