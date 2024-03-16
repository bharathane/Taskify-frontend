import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AppContext from "./Context/context";
import Register from "./components/Register";
import FavoriteTasks from "./components/FavoriteTasks";
import PrivateRoutes from "./components/ProtectedRoute";
import { useState } from "react";

const App = () => {
  const [theme, setThemeFunc] = useState(false);
  const [favoriteTasksList, setFavoriteTasks] = useState([]);

  const chnageTheme = () => {
    setThemeFunc(!theme);
  };

  const chageFavoriteTaskList = (data) => {
    setFavoriteTasks((prevState) => [...favoriteTasksList, ...data]);
  };

  return (
    <AppContext.Provider
      value={{ theme, favoriteTasksList, chageFavoriteTaskList, chnageTheme }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/favorite" element={<FavoriteTasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
export default App;
