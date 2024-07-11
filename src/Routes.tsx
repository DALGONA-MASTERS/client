import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as AllRoutes,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import { useSelector } from "react-redux";
import { selectToken } from "./features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Events from "./components/Events";
import Stats from "./components/Stats";
import Profil from "./components/Profil";
import CodePage from "./components/CodePage";
import EventDetailsPage from "./components/Events/EventDetailsPage";

const Routes: React.FC = () => {
  return (
    <Router>
      <AllRoutes>
        <Route path="/" element={<Authentication />} />
        <Route path="/code/:email" element={<CodePage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute
              element={
                <>
                  <Navbar />
                  <Events />
                </>
              }
            />
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute
              element={
                <>
                  <Navbar />
                  <Stats />
                </>
              }
            />
          }
        />
        <Route
          path="/events/:eventId"
          element={
            <>
              <Navbar />
              <EventDetailsPage />
            </>
          }
        />

        <Route
          path="/profil"
          element={
            <ProtectedRoute
              element={
                <>
                  <Navbar />
                  <Profil />
                </>
              }
            />
          }
        />
      </AllRoutes>
    </Router>
  );
};

export default Routes;
