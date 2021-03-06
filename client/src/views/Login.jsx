import React from "react";
import "./views.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useHandleSubmit from "../utils/useHandleSubmit";

function Login() {
  const { loginUser, setLoginUser, user, logIn, msg } = useContext(AuthContext);

  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const { handleSubmit, validated } = useHandleSubmit();

  return (
    <div className="containerLogIn">
      <div className="innerContainerLogIn">
        <h2>Login</h2>
        <div className="msg">{msg}</div>
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
            <p>
              Not have an account yet? Please <Link to="/signup">sign up</Link>.
            </p>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Login;
