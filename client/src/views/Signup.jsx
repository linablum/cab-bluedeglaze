import { useState } from "react";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});

  //REVIEW 24. create on event handler function for the 3 events OR create one event handle function for each of them
  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    // console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
    // console.log(selectedFile);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("submit working");
    // call  FormData object constructor to populate with pairs of key/values (in this case {image: "our file"} )
    const formData = new FormData();
    console.log("selectedFile", selectedFile);
    formData.append("image", selectedFile);
    console.log("formData", formData);
    // compose the object with the options to be sent with our request, including the type of method, and use the body of the request to attach data
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      setNewUser({ ...newUser, avatarPicture: result.imageUrL }); // imageURL is how the field is defined in usersController.
      console.log(newUser);
    } catch (error) {
      console.log('"error submiting picture"', error);
    }
  };

  //REVIEW 25. Create signUp function
  const signUp = async () => {
    //verify all necessary fields are filled
    // verify email / password length and strength with Regex

    //check code in Postman to see how composes the object that is sent in request's body
    let urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "avatarPicture",
      newUser.avatarPicture
        ? newUser.avatarPicture
        : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    );

    //REVIEW 25.1 Create and define the request options, including the objet created in the body
    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    //REVIEW 25.2 Fetch endpoint attaching the request options. Display succes/error message to user.
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signUp",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>

      <h2>form:</h2>

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
        {/* REVIEW 13.1 create form element with input and button to submit the form */}
        <form>
          <input type="file" onChange={attachFileHandler} />
          <button onClick={submitForm}>Upload picture</button>
        </form>
        {/* REVIEW 13.4. Conditional rendering of the user's pic, if there is one */}
        {newUser.avatarPicture && (
          <img src={newUser.avatarPicture} alt="userPic" />
        )}
      </div>
      <button onClick={signUp}>Signup</button>
    </div>
  );
}

export default SignUp;
