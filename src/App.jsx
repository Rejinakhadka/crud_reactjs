import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profiles from "./components/profile/Profile";
import Home from "./components/home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </Router>
  );
};

export default App;
