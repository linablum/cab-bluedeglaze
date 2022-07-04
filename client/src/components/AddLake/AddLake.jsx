import { useState } from "react";
import "./AddLake.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddLake() {
  const [newLake, setNewLake] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  //const [validated, setValidated] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("formData", formData);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/lakes/imageUpload",
        requestOptions
      );
      const result = await response.json();
      setNewLake({ ...newLake, lakePicture: result.imageUrL }); // imageURL is how the field is defined in usersController.
      console.log(newLake);
    } catch (error) {
      console.log('"error submiting picture"', error);
    }
  };

  const addLake = async () => {
    //verify all necessary fields are filled
    //verify length
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", newLake.name);
    urlencoded.append("area", newLake.area);
    urlencoded.append("location", newLake.location);
    urlencoded.append("shortDescription", newLake.shortDescription);
    urlencoded.append(
      "lakePicture",
      newLake.lakePicture ? newLake.lakePicture : ""
    );
    // urlencoded.append("author", );

    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/lakes/newlake",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  const handleChangeHandler = (e) => {
    setNewLake({ ...newLake, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="containerLake">
      <div className="innerContainerLake">
        <h1>Add a lake</h1>
        <Form noValidate>
          {/* validated={validated} */}
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name="name"
              value={newLake.name ? newLake.name : ""}
              type="text"
              onChange={handleChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please insert a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicArea">
            <Form.Label>Area</Form.Label>
            <Form.Control
              name="area"
              value={newLake.area ? newLake.area : ""}
              type="text"
              onChange={handleChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>User name</Form.Label>
            <Form.Control
              required
              name="location"
              value={newLake.location ? newLake.location : ""}
              type="text"
              onChange={handleChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please insert a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              required
              name="shortDescription"
              value={newLake.shortDescription ? newLake.shortDescription : ""}
              type="text"
              onChange={handleChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please write something about that lake.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Lake Image</Form.Label>
            <Form.Control type="file" onChange={attachFileHandler} />
            <Button className="signButton" onClick={submitForm}>
              Upload picture
            </Button>
          </Form.Group>
          <Button className="signButton" onClick={addLake}>
            Submit Lake
          </Button>
        </Form>
      </div>
      <div>
        {newLake.lakePicture && (
          <img
            src={newLake.lakePicture}
            className="lakeImage"
            alt="lakePicture"
          />
        )}
      </div>
    </div>
  );
}

export default AddLake;
