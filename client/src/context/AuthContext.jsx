import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/getToken";
import usePicUpload from "../utils/usePicUpload";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  //const redirectTo = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/imageUpload",
        formData
      );
      setNewUser({ ...newUser, avatarPicture: res.data.imageUrL });
      console.log("Image uploaded");
    } catch (error) {
      console.log('"error submiting picture"', error);
    }
  };

  const signUp = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/signUp", {
        userName: newUser.userName,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        avatarPicture: newUser.avatarPicture
          ? newUser.avatarPicture
          : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
      });
      console.log("Signup successful");
    } catch (error) {
      console.log("error fetching", error);
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const logIn = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: loginUser.email,
        password: loginUser.password,
      });
      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.log("error seting token");
      }
      console.log("result", res.data);
    } catch (error) {
      console.log("login error", error);
    }
  };

  const isUserLoggedIn = () => {
    const token = getToken();
    console.log(token);
    if (token) {
      setUser(true);
      getProfile();
      console.log("user is logged in");
    } else {
      setUser(false);
      setError("Please login first");
      console.log("user is NOT logged in");
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [user]);

  const getProfile = async () => {
    const token = getToken();
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile({
        email: res.data.email,
        userName: res.data.userName,
        avatarPicture: res.data.avatar,
      });
    } catch (error) {
      console.log("error getting profile", error);
    }
  };

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
        userProfile,
        setUserProfile,
        setError,
        error,
        errMsg,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
