import { SEARCH_TERMS } from "./constants";

//  Checks if input query is valid or not
export const isSearchQueryValid = value =>
  value &&
  SEARCH_TERMS.filter(searchTerm =>
    searchTerm.toLowerCase().includes(value.toLowerCase())
  ).length > 0;
