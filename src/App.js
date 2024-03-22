import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import NavBar from "./components/Navigation/logo.jsx";
import SignIn from "./features/Login/signin.jsx";
import SignUp from "./features/Login/signup.jsx";
import Dashboard from "./components/pages/Dashboard/index.jsx";
import CostOverview from "./components/pages/Costoverview/index.jsx";
import CostAnalysis from "./components/pages/Costanalysis/index.jsx";
import CostOptimization from "./components/pages/Costoptimization/index.jsx";
import BudgetandForecast from "./components/pages/BudgetandForecast/index.jsx";
import CostAllocation from "./components/pages/CostAllocation/index.jsx";

const PrivateRoute = ({ element, handleLogouts }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));
  return isAuthenticated ? (
    <NavBar handleLogouts={handleLogouts}>{element}</NavBar>
  ) : (
    <Navigate to="/" />
  );
};

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  React.useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [localStorage.getItem("userRole")]);

  const handleLogouts = () => {
    setUserRole(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
  };

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route element={<SignIn />} path="/" />
          <Route element={<SignUp />} path="/signup" />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<Dashboard />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/cost-overview"
            element={
              <PrivateRoute
                element={<CostOverview />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/cost-analysis"
            element={
              <PrivateRoute
                element={<CostAnalysis />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/cost-optimization"
            element={
              <PrivateRoute
                element={<CostOptimization />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/budget-forecast"
            element={
              <PrivateRoute
                element={<BudgetandForecast />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
          <Route
            path="/cost-allocation"
            element={
              <PrivateRoute
                element={<CostAllocation />}
                userRole={userRole}
                handleLogouts={handleLogouts}
              />
            }
          />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
