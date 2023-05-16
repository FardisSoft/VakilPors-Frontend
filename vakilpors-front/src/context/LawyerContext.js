import { createContext } from "react";

export const LawyerContext = createContext({
  setLawyers: () => {},
  setFilteredContacts: () => {},
  filteredLawyers: [],
  LawyerQuery: {},
  onContactChange: () => {},
  LawyerSearch: () => {},
});
