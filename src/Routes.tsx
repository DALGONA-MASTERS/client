import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as AllRoutes,
} from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";

const Routes: React.FC = () => {
  return (
    <Router>
      <AllRoutes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
      </AllRoutes>
    </Router>
  );
};

export default Routes;
