import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../views/Signup.css";
import useHandleSubmit from "../../utils/useHandleSubmit";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { getToken } from "../../utils/getToken";

function UpdateProfile() {
  const {
    setSelectedFile,
    userProfile,
    setUserProfile,
    submitForm,
    msg,
    setMsg,
  } = useContext(AuthContext);

  const { handleSubmit, validated } = useHandleSubmit();

  const updateProfile = async () => {
    console.log(userProfile);
    const token = getToken();
    try {
      await axios.post(
        "http://localhost:5000/api/users/profile",
        {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          password: userProfile.password,
          avatarPicture: userProfile.avatarPicture,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMsg("Update successful.");
      console.log("update successful");
    } catch (error) {
      console.log("error fetching", error);
      setMsg(error.response.data.message);
    }
  };

  const handleChangeHandler = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="containerSignUp">
      <div className="innerContainerSignUp">
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            handleSubmit(e, updateProfile);
          }}
        >
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  name="userName"
                  value={userProfile.userName}
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
                  value={userProfile.name}
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
              value={userProfile.email}
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
              value={userProfile.password}
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
          {<img src={userProfile.avatarPicture} alt="userPic" />}
          <Button type="submit" className="signButton">
            Update Profile
          </Button>
          <div>{msg}</div>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProfile;
