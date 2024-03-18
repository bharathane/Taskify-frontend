import { Link } from "react-router-dom";

import AppContext from "../../Context/context";
import Cookies from "js-cookie";
import { IoMoonSharp } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import "./index.css";

const Header = () => {
  // logout from app
  const logoutFromApp = () => {
    Cookies.remove("jwt_token");
    window.location.reload();
    localStorage.removeItem("username");
  };

  return (
    <AppContext.Consumer>
      {(value) => {
        const { theme, chnageTheme } = value;
        const taskifyHeadingDark = theme ? "taskify-color" : "";
        const navcontainerBackgorund = theme ? "nav-dark-mod" : "";
        const colorForThemeButton = theme
          ? "light-color-theme-button"
          : "dark-theme-button";

        const listItmeDark = theme ? "dark-list-item" : "";
        return (
          <nav className={`nav-container ${navcontainerBackgorund}`}>
            <h1 className={taskifyHeadingDark}>Taskify</h1>
            <ul>
              <Link to="/" className="nav-links">
                {" "}
                <li className={listItmeDark}>Home</li>
              </Link>
              <Link to="/favorite" className="nav-links">
                {" "}
                <li className={listItmeDark}>Favorite</li>
              </Link>
            </ul>
            <button
              onClick={() => chnageTheme()}
              className={`them-button ${colorForThemeButton}`}
            >
              {theme ? <IoSunny /> : <IoMoonSharp />}
            </button>
            <button type="button" onClick={logoutFromApp}>
              Logout
            </button>
          </nav>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Header;
