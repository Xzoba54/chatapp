import React from "react";
import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/chats");
    }
  }, []);

  const onSubmit = () => {
    const data = {
      login: login,
      password: password,
    };
    axios
      .post("http://localhost/chatapp/api/login.php", data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/chats");
      });
  };

  return (
    <div id="login" className="login__container padding__big">
      <h1 className="login__container-title">Login</h1>
      <div className="login__container__input">
        <input
          type="text"
          name="login"
          placeholder="Login"
          autoComplete="off"
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div className="login__container__input">
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <svg
          className="login__password-eye"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <div className="login__container__password">
        <a href="#">I don't remember password</a>
      </div>

      <button onClick={onSubmit} className="login__submit" type="submit">
        Login
      </button>
      <Link to="/register">Register</Link>
    </div>
  );
};
export default Login;
