import React, { useEffect, useState } from "react";
import { getToken } from "../utils/getToken.js";
import "./views.css";

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
      console.log("error getting profile", error);
      setError("Please login first");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const deleteProfile = async () => {
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/delete",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error deleting profile", error);
      setError("deleting not possible");
    }
  };
  return (
    <div>
      <h2>Profile</h2>
      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
          <p>{userProfile.email}</p>
          <img
            src={userProfile.avatarPicture}
            className="avatar"
            alt="userpicture"
          />
          <div>
            <button className="signButton">Update Profile</button>
            <button className="signButton" onClick={deleteProfile}>
              Delete Profile
            </button>
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Profile;
