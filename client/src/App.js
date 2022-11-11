import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import Background from "./components/background/Background";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Chats from "./components/chats/Chats.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
