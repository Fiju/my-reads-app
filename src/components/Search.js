import React from "react";
import { Book, Loader } from "./common";
import { getAll, search } from "../utils/BooksAPI";
import { isSearchQueryValid } from "../utils/search-query-validation";

class Search extends React.PureComponent {
  state = {
    query: "",
    searchedBooks: [], //  Books returned after searching over api call
    shelvedBooks: [], //  Books already added to shelves
    isFetching: false //  Status determining if network request in progress
  };

  componentDidMount() {
    getAll().then(shelvedBooks => this.setState({ shelvedBooks }));
  }

  onSearch = e => {
    if (isSearchQueryValid(e.target.value)) {
      this.setState({ isFetching: true });

      //  Fetching searched books and added shelf to them
      search(e.target.value.trim()).then(searchedBooks => {
        searchedBooks.forEach(book => {
          const shelvedBook = this.state.shelvedBooks.find(
            b => b.id === book.id
          );
          if (shelvedBook) book.shelf = shelvedBook.shelf;
        });
        this.setState({ searchedBooks, isFetching: false });
      });
    } else this.setState({ searchedBooks: [], isFetching: false });
  };

  updateLocalShelf = (book, shelf) => {
    //  Updating local shelf
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
            />
          </div>
        </div>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="search-books-results">
            <ol className="books-grid">
              {searchedBooks.map(book => (
                <li key={book.id}>
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
