import React from "react";
import { useState } from "react";
import { getToken } from "../utils/getToken.js";

function Login() {
  const [loginUser, setLoginUser] = useState({});

  const handleChangeHandler = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const logIn = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", loginUser.email);
    urlencoded.append("password", loginUser.password);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      const { token, user } = result;

      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.log("error seting token");
      }
      console.log("result", result);
    } catch (error) {
      console.log("login error", error);
    }
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
