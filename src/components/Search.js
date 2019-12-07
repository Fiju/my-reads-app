import React from "react";
import { Book, Loader } from "./common";
import { getAll, search } from "../utils/BooksAPI";
import { isSearchQueryValid } from "../utils/search-query-validation";

class Search extends React.PureComponent {
  state = {
    query: "",
    searchedBooks: [],
    shelvedBooks: [],
    isFetching: false
  };

  componentDidMount() {
    getAll().then(shelvedBooks => this.setState({ shelvedBooks }));
  }

  onSearch = e => {
    if (isSearchQueryValid(e.target.value)) {
      this.setState({ isFetching: true });
      search(e.target.value.trim()).then(searchedBooks => {
        searchedBooks.forEach(book => {
          const shelvedBook = this.state.shelvedBooks.find(
            b => b.id === book.id
          );
          if (shelvedBook) book.shelf = shelvedBook.shelf;
        });
        this.setState({ searchedBooks, isFetching: false });
      });
    }
  };

  updateLocalShelf = (book, shelf) => {
    const booksCopy = [...this.state.searchedBooks];
    booksCopy.find(b => book.id === b.id).shelf = shelf;
    this.setState({ searchedBooks: booksCopy });
  };

  render() {
    const { searchedBooks, isFetching } = this.state;
    const { history } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.push("/")}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
              // onChange={e => setQuery(e.target.value.trim())}
            />
          </div>
        </div>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="search-books-results">
            <ol className="books-grid">
              {searchedBooks.map((book, bookIndex) => (
                <li key={bookIndex}>
                  <Book {...book} updateLocalShelf={this.updateLocalShelf} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
