import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../utils/getToken.js";
import "./views.css";

function Profile() {
  const { userProfile, setUserProfile, error, setError } =
    useContext(AuthContext);

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
      setUserProfile(false);
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
