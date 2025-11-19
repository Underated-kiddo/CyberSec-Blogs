import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import Ret2WinPage from "./pages/blogs/Re2win";
import CTF247Page from "./pages/blogs/247CTFs";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/blogs/ret2win" element={<Ret2WinPage />} />
        <Route path="/blogs/247CTFs" element={< CTF247Page />} />
      </Routes>
    </Router>
  );
}