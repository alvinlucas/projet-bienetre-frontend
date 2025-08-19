import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Videos from "./pages/Video";
import Abonnement from "./pages/Abonnement";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="bg-beige min-h-screen">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/abonnement" element={<Abonnement />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
