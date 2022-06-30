import { useEffect, useState } from "react";
import { useContext } from "react";
import "./Signup.css";
import { AuthContext } from "../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SignUp() {
  const { newUser, setNewUser, setSelectedFile, signUp, submitForm } =
    useContext(AuthContext);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
    }
    if (form.checkValidity() === true) {
      setValidated(true);

      sign();
    }
  };
  const sign = () => {
    if (validated === true) {
      // setValidated(true);

      // e.preventDefault();
      // signUp();
      console.log("user signed up");
    }
    // console.log("sign");
  };

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="containerSignUp">
      <div className="innerContainerSignUp">
        <h1>Sign Up</h1>
        <Form noValidate validated={validated}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  required
                  name="userName"
                  value={newUser.userName ? newUser.userName : ""}
                  type="text"
                  placeholder="User name"
                  onChange={handleChangeHandler}
                />
                <Form.Control.Feedback type="invalid">
                  Please pick a user name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={newUser.name ? newUser.name : ""}
                  type="text"
                  placeholder="Name"
                  onChange={handleChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              value={newUser.email ? newUser.email : ""}
              type="email"
              placeholder="Enter email"
              onChange={handleChangeHandler}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please enter a valid email adress.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={newUser.password ? newUser.password : ""}
              type="password"
              placeholder="Password"
              onChange={handleChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please coose a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile avatar</Form.Label>
            <Form.Control type="file" onChange={attachFileHandler} />
            <Button className="signButton" onClick={submitForm}>
              Upload picture
            </Button>
          </Form.Group>
          {newUser.avatarPicture && (
            <img src={newUser.avatarPicture} alt="userPic" />
          )}
          <Button className="signButton" onClick={handleSubmit}>
            Signup
          </Button>
        </Form>
        {/* 
      <div className="container">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={newUser.userName ? newUser.userName : ""}
            name="userName"
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="name"
            type="text"
            value={newUser.name ? newUser.name : ""}
            name="name"
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={newUser.email ? newUser.email : ""}
            name="email"
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={newUser.password ? newUser.password : ""}
            name="password"
            onChange={handleChangeHandler}
          />
        </div>
        <form>
          <label hmtmlFor="pictureUpload" className="btnFile">
            Choose file
            <input
              type="file"
              id="pictureUpload"
              onChange={attachFileHandler}
            />
          </label>
          <button onClick={submitForm}>Upload picture</button>
        </form>
        {newUser.avatarPicture && (
          <img src={newUser.avatarPicture} alt="userPic" />
        )}
      </div>
      <button onClick={signUp}>Signup</button>*/}
      </div>
    </div>
  );
}

export default SignUp;
