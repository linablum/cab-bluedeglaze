/* import { useState } from "react";
import axios from "axios";

function usePicUpload() {
  const [newUser, setNewUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const submitForm = async (e, folder) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("formData", formData);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/${folder}/imageUpload",
        formData
      );
      console.log(res.data);
      setNewUser({ ...newUser, avatarPicture: res.data.imageUrL });
      console.log(newUser);
    } catch (error) {
      console.log('"error submiting picture"', error);
    }
  };
  return { submitForm };
}
export default usePicUpload; */
