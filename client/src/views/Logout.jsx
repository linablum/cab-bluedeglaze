import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Logout() {
  const { logOut } = useContext(AuthContext);
  return (
    <Button onClick={logOut} variant="danger" className="logoutButton">
      logout
    </Button>
  );
}

export default Logout;
