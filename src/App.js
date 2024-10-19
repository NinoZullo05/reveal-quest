import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import { ThemeProvider } from "./hooks/ThemeContext";
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Game" element={<GamePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
