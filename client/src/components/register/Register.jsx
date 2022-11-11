import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "../alert/Alert";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    showAlert: false,
    error: false,
    text: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/chats");
    }
  }, []);

  const onSubmit = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost/chatapp/api/register.php", data)
      .then((response) => {
        console.log(response.data);
        setError({
          showAlert: true,
          error: response.data.error,
          text: response.data.errortype,
        });
      });
  };
  const hideAlert = () => {
    setError({ showAlert: false });
  };
  return (
    <div id="register" className="login__container padding__big">
      {error.showAlert && (
        <Alert
          error={error.error}
          text={error.text}
          handlehidealert={hideAlert}
        />
      )}
      <h1 className="login__container-title">Register</h1>
      <div className="login__container__input">
        <input
          type="text"
          name="login"
          placeholder="Username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="login__container__input">
        <input
          type="email"
          name="password"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login__container__input">
        <input
          type="password"
          name="login"
          placeholder="Password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button onClick={onSubmit} className="login__submit" type="submit">
        Register
      </button>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Register;
