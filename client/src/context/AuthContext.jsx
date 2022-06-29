import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const redirectTo = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    // call  FormData object constructor to populate with pairs of key/values (in this case {image: "our file"} )
    const formData = new FormData();
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
      const result = await response.json();
      setNewUser({ ...newUser, avatarPicture: result.imageUrL }); // imageURL is how the field is defined in usersController.
      console.log(newUser);
    } catch (error) {
      console.log('"error submiting picture"', error);
    }
  };

  const signUp = async () => {
    //verify all necessary fields are filled
    // verify email / password length and strength with Regex
    let urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("name", newUser.name);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "avatarPicture",
      newUser.avatarPicture
        ? newUser.avatarPicture
        : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    );

    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

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

  const isUserLoggedIn = () => {
    const token = getToken();
    console.log(token);
    if (token) {
      setUser(true);
      console.log("user is logged in");
    } else {
      setUser(false);
      console.log("user is NOT logged in");
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [user]);

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        selectedFile,
        setSelectedFile,
        newUser,
        setNewUser,
        loginUser,
        setLoginUser,
        signUp,
        submitForm,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
