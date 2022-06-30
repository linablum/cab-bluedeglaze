import React, { useState } from "react";
import "./Login.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const { loginUser, setLoginUser, logIn } = useContext(AuthContext);
  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="containerLogIn">
      <div className="innerContainerLogIn">
        <h2>Login</h2>
        <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              value={loginUser.email ? loginUser.email : ""}
              type="email"
              placeholder="Enter email"
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
              placeholder="Password"
              onChange={handleChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please enter password.
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="signButton" onClick={logIn}>
            Login
          </Button>
        </Form>

        {/* 
      <div className="container">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="Login-email"
            type="email"
            value={loginUser.email ? loginUser.email : ""}
            name="email"
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="login-password"
            type="password"
            value={loginUser.password ? loginUser.password : ""}
            name="password"
            onChange={handleChangeHandler}
          />
        </div>
      </div>
      <button onClick={logIn}>Login</button>*/}
      </div>
    </div>
  );
}

export default Login;
