import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewRequest from "./pages/NewRequest";
import Home from "./pages/Home";
import "./styles/Header.css";

function App() {
  return (
    <div className="app">
      <header className="auth-header">
        <h1>ServisDesk</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-request" element={<NewRequest />} />
      </Routes>
    </div>
  );
}

export default App;
