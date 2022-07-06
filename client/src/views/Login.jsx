import React, { useState } from "react";
import "./Login.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useHandleSubmit from "../utils/useHandleSubmit";

function Login() {
  const { loginUser, setLoginUser, user, logIn } = useContext(AuthContext);

  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const { handleSubmit, validated } = useHandleSubmit();

  return (
    <div className="containerLogIn">
      <div className="innerContainerLogIn">
        <h2>Login</h2>
        {user ? (
          "You are already logged in"
        ) : (
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => {
              handleSubmit(e, logIn);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                name="email"
                value={loginUser.email ? loginUser.email : ""}
                type="email"
                onChange={handleChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email adress.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={loginUser.password ? loginUser.password : ""}
                type="password"
                onChange={handleChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="signButton" type="submit">
              Login
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Login;
