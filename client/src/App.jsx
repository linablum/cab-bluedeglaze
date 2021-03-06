import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Lakes from "./views/Lakes";
import Home from "./views/Home";
import AddLake from "./components/AddLake/AddLake";
import About from "./views/About";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lakes" element={<Lakes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newlake" element={<AddLake />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
