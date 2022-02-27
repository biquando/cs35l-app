import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Timeline from "./components/body/Timeline";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        {/* <nav> */}
        <NavBar />
        <SideBar />
        <Link to="/"> Login </Link>
        <Link to="/about"> SignUp </Link>
        {/* </nav> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
