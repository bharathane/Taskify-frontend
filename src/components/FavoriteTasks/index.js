import Header from "../Header";
import AppContext from "../../Context/context";

import "./index.css";

const FavoriteTasks = () => {
  return (
    <AppContext.Consumer>
      {(value) => {
        const { favoriteTasksList, theme } = value;
        const darkTheme = theme ? "dark-bg" : "";
        const darkList = theme ? "dark-list" : "";
        return (
          <>
            <Header />
            <div className={`background-container ${darkTheme}`}>
              {favoriteTasksList.length === 0 ? (
                <h1>Nothing to Show! please add some tasks</h1>
              ) : (
                <>
                  {favoriteTasksList.map((each) => (
                    <li key={each.id} className={`fovireite-task ${darkList}`}>
                      <h1>{each.task}</h1>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
                        alt="filled star"
                        className="start-style"
                      />
                    </li>
                  ))}
                </>
              )}
            </div>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

export default FavoriteTasks;
