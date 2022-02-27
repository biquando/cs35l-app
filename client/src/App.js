import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Timeline from "./components/body/Timeline";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Body />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
