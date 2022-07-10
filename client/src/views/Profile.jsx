import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../utils/getToken.js";
import "./views.css";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import { useState } from "react";
import useHandleSubmit from "../utils/useHandleSubmit";

function Profile() {
  const { userProfile, setUserProfile, error, setError, logOut, msg, setMsg } =
    useContext(AuthContext);

  const [visible, setVisible] = useState(null);

  const deleteProfile = async () => {
    const token = getToken();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/delete",
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserProfile(false);
      logOut();
    } catch (error) {
      console.log("error deleting profile", error);
      setError("deleting not possible");
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
            <p>{userProfile.userName}</p>
            <p>{userProfile.name}</p>
            <p>{userProfile.email}</p>
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
              </button>
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
