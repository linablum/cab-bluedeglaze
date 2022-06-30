import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Lakes from "./views/Lakes";
import Home from "./views/Home";
import AddLake from "./components/AddLake/AddLake";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lakes" element={<Lakes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newlake" element={<AddLake />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
