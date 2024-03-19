import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import AppContext from "../../Context/context";
import "./index.css";
const EachTask = (props) => {
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const [updateInputVal, setUpdateInputVal] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  // destructure methods and properties
  const {
    single,
    getIdForUpateAndDelete,
    updateTask,
    makingApiCall,
    getIdForFavorite,
    isStyled,
    getIdForMarkdown,
  } = props;
  const { id, task } = single;

  const onChangeUpdateStatus = () => {
    setIsUpdateClick(!isUpdateClick);
  };

  // pass Id for update
  const callGetIdFunc = () => {
    getIdForUpateAndDelete(id);
  };
  // pass id for update task
  const onChangeUpdateInput = (e) => {
    setUpdateInputVal(e.target.value);
  };
  // pass data for update task
  const callUpdateFunc = () => {
    updateTask(id, updateInputVal);
    makingApiCall();
   
  };

  // pass Id for favoritelist add on
  const callIdForFavorte = () => {
    getIdForFavorite(id);
    setIsFavorite(!isFavorite);
  };

  // pass Id for markdown
  const callMarkdownFunc = () => {
    getIdForMarkdown(id);
  };

  return (
    <AppContext.Consumer>
      {(value) => {
        const { theme } = value;
        const darBgForLi = theme ? "dark-bg-li" : "";
        const checkListTask = isStyled ? "chelistTaks" : "";
        const isCheckedCheckBox = isStyled ? true : false;
        return (
          <li className={`each-task-container ${darBgForLi} `}>
            <input
              type="checkbox"
              checked={isCheckedCheckBox}
              id="checkboxElement"
              onChange={callMarkdownFunc}
            />
            {isUpdateClick ? (
              <input
                type="text"
                placeholder={`${task}...`}
                className="update-input-element"
                onChange={onChangeUpdateInput}
              />
            ) : (
              <label htmlFor="checkboxElement" className={checkListTask}>
                {" "}
                {task}
              </label>
            )}
            {isUpdateClick && (
              <button
                type="button"
                className="task-update-button"
                onClick={callUpdateFunc}
              >
                update
              </button>
            )}
            <button type="button" onClick={onChangeUpdateStatus}>
              {isUpdateClick ? "X" : <FaPencil />}
            </button>

            <button type="button" onClick={callGetIdFunc}>
              <MdDelete />
            </button>
            {isFavorite ? (
              <button type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
                  alt="filled start"
                />
              </button>
            ) : (
              <button type="button" onClick={callIdForFavorte}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
                  alt="white start"
                />
              </button>
            )}
          </li>
        );
      }}
    </AppContext.Consumer>
  );
};

export default EachTask;
