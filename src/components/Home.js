import React from "react";
import Book from "./Book";
import { SHELF_TYPES } from "../utils/constants";
import { getAll } from "../BooksAPI";

class Home extends React.PureComponent {
  state = {
    books: []
  };

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  updateLocalShelf = (book, shelf) => {
    const booksCopy = [...this.state.books];
    booksCopy.find(b => book.id === b.id).shelf = shelf;
    this.setState({ books: booksCopy });
  };

  render() {
    const { books } = this.state;
    const { history } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === SHELF_TYPES.currentlyReading)
                    .map(book => (
                      <li>
                        <Book
                          {...book}
                          updateLocalShelf={this.updateLocalShelf}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === SHELF_TYPES.wantToRead)
                    .map(book => (
                      <li>
                        <Book
                          {...book}
                          updateLocalShelf={this.updateLocalShelf}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter(book => book.shelf === SHELF_TYPES.read)
                    .map(book => (
                      <li>
                        <Book
                          {...book}
                          updateLocalShelf={this.updateLocalShelf}
                        />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

// export default ({ showSearch, history }) => {
//   const [books, isFetching] = useShelvedBooks();
//   return (
//     <div className="list-books">
//       <div className="list-books-title">
//         <h1>MyReads</h1>
//       </div>
//       <div className="list-books-content">
//         <div>
//           <div className="bookshelf">
//             <h2 className="bookshelf-title">Currently Reading</h2>
//             <div className="bookshelf-books">
//               <ol className="books-grid">
//                 {books
//                   .filter(book => book.shelf === SHELF_TYPES.currentlyReading)
//                   .map(book => (
//                     <li>
//                       <Book {...book} />
//                     </li>
//                   ))}
//               </ol>
//             </div>
//           </div>
//           <div className="bookshelf">
//             <h2 className="bookshelf-title">Want to Read</h2>
//             <div className="bookshelf-books">
//               <ol className="books-grid">
//                 {books
//                   .filter(book => book.shelf === SHELF_TYPES.wantToRead)
//                   .map(book => (
//                     <li>
//                       <Book {...book} />
//                     </li>
//                   ))}
//               </ol>
//             </div>
//           </div>
//           <div className="bookshelf">
//             <h2 className="bookshelf-title">Read</h2>
//             <div className="bookshelf-books">
//               <ol className="books-grid">
//                 {books
//                   .filter(book => book.shelf === SHELF_TYPES.read)
//                   .map(book => (
//                     <li>
//                       <Book {...book} />
//                     </li>
//                   ))}
//               </ol>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="open-search">
//         <button onClick={() => history.push("/search")}>Add a book</button>
//       </div>
//     </div>
//   );
// };

export default Home;
