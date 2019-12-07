import React from "react";
import Book from "./Book";
import { getAll, search } from "../BooksAPI";
import { isSearchQueryValid } from "../utils/search-query-validation";

class Search extends React.PureComponent {
  state = {
    query: "",
    searchedBooks: [],
    shelvedBooks: []
  };

  // isQueryValid = value =>
  //   value.length > 2 &&
  //   SEARCH_TERMS.filter(searchTerm =>
  //     searchTerm.toLowerCase().includes(value.toLowerCase())
  //   ).length > 0;

  componentDidMount() {
    getAll().then(shelvedBooks => this.setState({ shelvedBooks }));
  }

  onSearch = e => {
    if (isSearchQueryValid(e.target.value)) {
      search(e.target.value.trim()).then(searchedBooks => {
        searchedBooks.forEach(book => {
          const shelvedBook = this.state.shelvedBooks.find(
            b => b.id === book.id
          );
          if (shelvedBook) book.shelf = shelvedBook.shelf;
        });
        this.setState({ searchedBooks });
      });
    }
  };

  updateLocalShelf = (book, shelf) => {
    const booksCopy = [...this.state.searchedBooks];
    booksCopy.find(b => book.id === b.id).shelf = shelf;
    this.setState({ searchedBooks: booksCopy });
  };

  render() {
    const { searchedBooks } = this.state;
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
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map((book, bookIndex) => (
              <li key={bookIndex}>
                <Book {...book} updateLocalShelf={this.updateLocalShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

// export default ({ onBack, history }) => {
//   const [query, setQuery] = useState("");
//   const [shelvedBooks, abc] = useShelvedBooks();
//   const [books, isFetching] = useSearchData(query, shelvedBooks);
//   return (
//     <div className="search-books">
//       <div className="search-books-bar">
//         <button className="close-search" onClick={() => history.push("/")}>
//           Close
//         </button>
//         <div className="search-books-input-wrapper">
//           {/*
//       NOTES: The search from BooksAPI is limited to a particular set of search terms.
//       You can find these search terms here:
//       https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

//       However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
//       you don't find a specific author or title. Every search is limited by search terms.
//     */}
//           <input
//             type="text"
//             placeholder="Search by title or author"
//             onChange={e => setQuery(e.target.value.trim())}
//           />
//         </div>
//       </div>
//       <div className="search-books-results">
//         <ol className="books-grid">
//           {!isFetching &&
//             books.map((book, bookIndex) => (
//               <li key={bookIndex}>
//                 <Book
//                   {...book}
//                   updateLocalShelf={(id, value) => (book.shelf = value)}
//                 />
//               </li>
//             ))}
//         </ol>
//       </div>
//     </div>
//   );
// };
