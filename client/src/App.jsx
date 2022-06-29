import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken } from "./utils/getToken";
import { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Lakes from "./views/Lakes";
import Home from "./views/Home";

function App() {
  // move to auth context
  const [user, setUser] = useState(false);

  const isUserLoggedIn = () => {
    const token = getToken();
    console.log(token);
    if (token) {
      setUser(true);
      console.log("user is logged in");
    } else {
      setUser(false);
      console.log("user is NOT logged in");
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [user]);

  return (
    <div className="bg">
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lakes" element={<Lakes />} />
          <Route path="/login" element={<Login />} />
          {/*  <Route path="/logout" element={<Logout />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" />
        </Routes>
        <Home />
      </div>
    </div>
  );
}

export default App;
