import React from "react";
import { Book, Loader } from "./common";
import { SHELF_TYPES } from "../utils/constants";
import { getAll } from "../utils/BooksAPI";

class Home extends React.PureComponent {
  state = {
    books: [],
    isFetching: true
  };

  componentDidMount() {
    getAll().then(books => this.setState({ books, isFetching: false }));
  }

  updateLocalShelf = (book, shelf) => {
    //  Updating local shelf
    const booksCopy = [...this.state.books];
    booksCopy.find(b => book.id === b.id).shelf = shelf;
    this.setState({ books: booksCopy });
  };

  render() {
    const { books, isFetching } = this.state;
    const { history } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {isFetching ? (
          <Loader />
        ) : (
          <div className="list-books-content">
            <div>
              {SHELF_TYPES.map(shelf => (
                <div key={shelf.value} className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.label}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        .filter(book => book.shelf === shelf.value)
                        .map(book => (
                          <li key={book.id}>
                            <Book
                              {...book}
                              updateLocalShelf={this.updateLocalShelf}
                            />
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default Home;
