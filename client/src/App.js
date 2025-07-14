import React, { useEffect, useState } from "react";
import axios from "axios";
import MainPage from "./pages/MainPage";
import Stepper from "./components/Stepper";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("Error connecting to backend"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stepper" element={<Stepper />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
