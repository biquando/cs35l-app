import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Timeline from "./components/body/Timeline";
import CreateEvent from "./components/CreateEvent";
import CreateGroup from "./components/CreateGroup";
import UserPage from "./components/UserPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Body />} />
            <Route path="/user/:user_id" element={<UserPage />} />
            <Route
              path="/group/:groupId/create-event"
              element={<CreateEvent />}
            />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route
              path="/group/:groupId/event/:eventId/edit"
              element={<CreateGroup />}
            />
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
