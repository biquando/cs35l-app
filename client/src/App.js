import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <nav>
          <NavBar />
          <Link to="/"> Login </Link>
          <Link to="/about"> SignUp </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
