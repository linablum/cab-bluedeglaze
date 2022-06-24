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
      setError("login first ");
    }
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
