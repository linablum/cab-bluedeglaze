import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./views.css";

function Login() {
  const { loginUser, setLoginUser, logIn } = useContext(AuthContext);
  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Login</h2>

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
      <button onClick={logIn}>Login</button>
    </div>
  );
}

export default Login;
