import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../utils/getToken.js";
import "./views.css";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";

function Profile() {
  const { userProfile, setUserProfile, error, setError, logOut } =
    useContext(AuthContext);

  const [visible, setVisible] = useState(null);

  const deleteProfile = async () => {
    const token = getToken();
    try {
      await axios.post("http://localhost:5000/api/users/delete", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(false);
      logOut();
    } catch (error) {
      console.log("error deleting profile", error);
      setError("Deleting not possible");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {visible ? (
        <UpdateProfile />
      ) : (
        userProfile && (
          <div>
            <p>username: {userProfile.userName}</p>
            <p>name: {userProfile.name}</p>
            <p>email: {userProfile.email}</p>
            <img
              src={userProfile.avatarPicture}
              className="avatar"
              alt="userpicture"
            />
            <div>
              <button
                className="signButton"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Update Profile
              </button>{" "}
              <button className="signButton" onClick={deleteProfile}>
                Delete Profile
              </button>
            </div>
          </div>
        )
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Profile;
