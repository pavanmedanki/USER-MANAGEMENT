import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import SignIn from "./features/Login/signin";
import SignUp from "./features/Login/signup";
import "./App.css";
import SideNavBar from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<SideNavBar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
