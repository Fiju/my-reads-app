import React from "react";
import { update } from "../../utils/BooksAPI";
import { SHELF_TYPES } from "../../utils/constants";

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
            {SHELF_TYPES.map(shelf => (
              <option key={shelf.value} value={shelf.value}>
                {shelf.label}
              </option>
            ))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};
