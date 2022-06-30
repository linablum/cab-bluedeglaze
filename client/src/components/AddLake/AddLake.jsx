import { useState } from "react";

function AddLake() {
  const [newLake, setNewLake] = useState({});

  const addLake = async () => {
    //verify all necessary fields are filled
    // verify email / password length and strength with Regex
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", newLake.name);
    urlencoded.append("area", newLake.area);
    urlencoded.append("location", newLake.location);
    urlencoded.append("shortDescription", newLake.shortDescription);
    urlencoded.append(
      "lakePicture",
      newLake.lakePicture ? newLake.lakePicture : ""
    );

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
}

export default AddLake;
