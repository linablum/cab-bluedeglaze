import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ValidateComponent(props) {
  const e = props.event;
  const { signUp } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  console.log("first");
  const handleSubmit = (e) => {
    console.log("second");
    const form = e.currentTarget;
    console.log("form", form);

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      e.preventDefault();
      signUp();
    }
  };
}

export default ValidateComponent;
