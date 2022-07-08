import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Signup.css";
import useHandleSubmit from "../utils/useHandleSubmit";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const { newUser, setNewUser, setSelectedFile, signUp, submitForm, msg } =
    useContext(AuthContext);

  const { handleSubmit, validated } = useHandleSubmit();

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
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            handleSubmit(e, signUp);
          }}
        >
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  name="userName"
                  value={newUser.userName ? newUser.userName : ""}
                  type="text"
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
                  required
                  name="name"
                  value={newUser.name ? newUser.name : ""}
                  type="text"
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
              value={newUser.password ? newUser.password : ""}
              type="password"
              pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
              onChange={handleChangeHandler}
            />
            <Form.Text className="text-muted">
              At least one number and one uppercase letter, and 8 or more
              characters.
            </Form.Text>
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
          <Button type="submit" className="signButton">
            Signup
          </Button>
          <div>{msg}</div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
