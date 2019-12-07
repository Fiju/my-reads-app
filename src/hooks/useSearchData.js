import { useState, useEffect } from "react";
import { search } from "../BooksAPI";

export function useSearchData(term) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const isLoading = isFetching === true;

  useEffect(() => {
    async function fetchData() {
      if (term) {
        setIsFetching(true);
        const response = await search(term);

        if (response) {
          setData(response);
          setIsFetching(false);
        }
      }
    }

    fetchData();
  }, [term]);

  return [data, isLoading];
}
