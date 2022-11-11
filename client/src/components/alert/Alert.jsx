import React from "react";
import "./alert.css";
import { Link } from "react-router-dom";

function Alert({ error, text, handlehidealert }) {
  return (
    <div className="alert__container">
      <h1 className="alert__container-title">
        {error ? "Something went wrong" : "Account created successfully"}
      </h1>
      <span className="alert__container-text">{text}</span>
      {error ? (
        <button onClick={handlehidealert}>Close</button>
      ) : (
        <Link to="/">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Alert;
