import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Ensure the path is correct
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
}

