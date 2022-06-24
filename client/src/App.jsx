import "./App.css";
import { useState } from "react";
import { getToken } from "./utils/getToken";
import { useEffect } from "react";
import Login from "./views/Login";
//import SignUp from "./views/Signup";

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

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="App">
      <Login />
      <button onClick={logOut} style={{ backgroundColor: "red" }}>
        logout
      </button>
    </div>
  );
}

export default App;
