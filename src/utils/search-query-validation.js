import { SEARCH_TERMS } from "./constants";

export const isSearchQueryValid = value =>
  value.length > 2 &&
  SEARCH_TERMS.filter(searchTerm =>
    searchTerm.toLowerCase().includes(value.toLowerCase())
  ).length > 0;
