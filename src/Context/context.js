import { createContext } from "react";

const AppContext = createContext({
  theme: false,
  favoriteTasksList: [],
  chageFavoriteTaskList: () => {},
  chnageTheme: () => {},
});

export default AppContext;
