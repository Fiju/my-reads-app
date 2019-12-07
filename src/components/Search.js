import React, { useState } from "react";
import { useSearchData } from "../hooks";
import Book from "./Book";

export default ({ onBack, history }) => {
  const [query, setQuery] = useState("");
  const [books, isFetching] = useSearchData(query);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={e => setQuery(e.target.value.trim())}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {!isFetching &&
            books.map((book, bookIndex) => (
              <li key={bookIndex}>
                <Book {...book} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};
