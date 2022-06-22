import { v2 as cloudinary } from "cloudinary";
import User from "../models/usersModel.js";
//import encryptPassword from "../utils/encryptPassword.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.body", req.body);
  try {
    console.log("req.file", req.file);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "bluedeglaze-user",
    });
    console.log("result", uploadResult);
    res.status(200).json({
      message: "Image succesfully uploaded.",
      imageUrL: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image couldn't be uploaded.", error: error });
  }
};

import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("salt", salt);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("Error hashing password.", error);
  }
};

const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists!" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);
      console.log("hashedPassword", hashedPassword);
      const newUser = new User({
        userName: req.body.userName,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatarPicture: req.body.avatarPicture,
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            name: savedUser.name,
            email: savedUser.email,
            avatarPicture: savedUser.avatarPicture,
          },
          message: "User registered",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "Error while saving new user.", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "Registration not possible.", error: error });
  }
};

const logIn = async (req, res) => {};

export { uploadUserPicture, signUp, logIn };
