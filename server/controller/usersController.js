//REVIEW 9. Install cloudinary, import V2 from cloudinary
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import encryptPassword from "../utils/encryptPassword.js";
// import bcrypt from "bcrypt";

//REVIEW 12. Define upload function
const uploadUserPicture = async (req, res) => {
  console.log("req.body", req.body);
  try {
    console.log("req.file", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "quokkas-spike",
    });
    console.log("result", uploadResult); //this show us the object with all the information about the upload, including the public URL in result.url
    res.status(200).json({
      message: "image succesfully uploaded",
      imageUrL: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

//REVIEW 17. Start implementing password encription: Install bcrypt and import it
//REVIEW 18. create function to hash password and implement bcrypt technique

// const encryptPassword = async (password) => {
//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashPassword = await bcrypt.hash(password, salt);

//     return hashPassword;
//   } catch (error) {
//     console.log("error hashing password", error);
//   }
// }; //! this function has been moved to utils/encryptPassword.js

//REVIEW 16. Create signUp function
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "user already exists" });
    } else {
      //REVIEW 23. good place to use express validator middleware, to validate email/password/any other fields.

      //REVIEW 19. use encryptPassword function to hash password coming from the request.
      const hashedPassword = await encryptPassword(req.body.password);
      console.log("hashedPassword", hashedPassword);

      //REVIEW 20. create new user Object with the encrypted password and the uploaded picture
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        avatarPicture: req.body.avatarPicture,
        //REVIEW 22. IF we include user Roles, we would have to include it in our newUser object (and Model)
      });
      //REVIEW 21. I "try" to save my new created user.
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            avatarPicture: savedUser.avatarPicture,
          },
          message: "user registered",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving new user", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "registration not possible", error: error });
  }
};

export { uploadUserPicture, signUp };
