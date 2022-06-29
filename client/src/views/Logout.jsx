import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const { logOut } = useContext(AuthContext);
  return (
    <button onClick={logOut} style={{ backgroundColor: "red" }}>
      logout
    </button>
  );
}

export default Logout;
