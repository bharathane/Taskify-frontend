import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { apiConstains } from "../ApiConstains";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSubmitError, setShowErrorMsg] = useState(false);
  const [apiStatus, setApiStatu] = useState(apiConstains.initial);

  const onSuccess = (jwtToken) => {
    setShowErrorMsg(false);
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    window.location.replace("/");
    setApiStatu(apiConstains.success);
  };

  const onFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowErrorMsg(true);
    setApiStatu(apiConstains.failure);
  };

  const onLoginClicked = async (event) => {
    event.preventDefault();
    setApiStatu(apiConstains.inprogress);
    const userDetails = { username, password };

    const url = "https://task-manager-backend-2qah.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (res.ok === true) {
      onSuccess(data.jwtToken);
    } else {
      onFailure(data.message);
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  // render final view based on apiStatus
  const renderLoader = () => {
    switch (apiStatus) {
      case apiConstains.success:
        return null;
      case apiConstains.inprogress:
        return <ThreeDots />;
      case apiConstains.failure:
        return null;
      default:
        return null;
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {renderLoader()}
      <div className="bgCon">
        <div className="loginCon">
          <div className="imgContainer">
            <img
              src="https://res.cloudinary.com/dr2jqbir9/image/upload/v1710487584/6b6e12d1-ffc5-4efb-8239-9dfd1fde4503_msgob7.png"
              alt="website login"
              className="books-image"
            />
          </div>
          <div className="inputCon">
            <img
              src="https://res.cloudinary.com/dyyexkznb/image/upload/v1647488445/instaShareLogo_wfbdew.png"
              alt="website logo"
            />
            <h1>Taskify</h1>
            <form className="formCon" onSubmit={onLoginClicked}>
              <label htmlFor="userName" className="labelTxt">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="inputEl"
                onChange={onChangeUsername}
              />
              <label htmlFor="password" className="labelTxt">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="inputEl"
                onChange={onChangePassword}
              />
              <button type="submit" className="btn">
                Login
              </button>
              {showSubmitError && <p className="err-msg">*{errorMsg}</p>}
              <p>
                Doesn't have an account ? <a href="register">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
