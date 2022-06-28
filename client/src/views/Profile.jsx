import React from "react";
import { useState } from "react";
import { getToken } from "../utils/getToken.js";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setUserProfile({
        email: result.email,
        userName: result.userName,
        avatarPicture: result.avatar,
      });
    } catch (error) {
      console.log("error gettin profile", error);
      setError("login first");
    }

    /* const submitHandler = async (e) => {
      e.preventDefault();
      const updateUserWithPic = {
        userId: loggedUser._id,
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName); // REVIEW if order would be 1st ("file", file), it wont worl in server.js with body.req.name , but with file.originalname
        data.append("file", file);
        updateUserWithPic.coverPicture = fileName;
        try {
          await axios2.post("/upload", data);
          console.log(`picture uploaded to Server`, data);
        } catch (err) {
          console.log(`ERROR uploading file`, err.message);
        }
      }
      try {
        await axios2.put("/users/" + userId, updateUserWithPic);
        window.location.reload(); // REVIEW cheap trick to refresh after uploading. Later create a post context and update post state
        console.log(`user updated with Picture`, updateUserWithPic);
      } catch (err) {
        console.log("error", err.message);
      }
    }; */
  };
  return (
    <div>
      <h2> Profile</h2>
      <button onClick={getProfile} style={{ backgroundColor: "lightblue" }}>
        get Profile
      </button>
      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
          <p>{userProfile.email}</p>
          <img src={userProfile.avatarPicture} alt="userpicture" />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Profile;
