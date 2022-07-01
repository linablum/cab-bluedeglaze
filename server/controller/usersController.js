import { v2 as cloudinary } from "cloudinary";
import User from "../models/usersModel.js";
import { encryptPassword, verifyPassword } from "../utils/bycrypt.js";
import { issueToken } from "../utils/jwt.js";

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

const logIn = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    res.status(401).json({
      msg: "you have to register first",
    });
  } else {
    const verified = await verifyPassword(
      req.body.password,
      existingUser.password
    );
    console.log("exisiting user password", existingUser.password);
    console.log("exisiting user password", req.body.password);
    if (!verified) {
      res.status(401).json({
        msg: "wrong password",
      });
    } else {
      console.log("verified", verified);
      const token = issueToken(existingUser.id);

      res.status(200).json({
        msg: "logging succesful",
        user: {
          userName: existingUser.userName,
          name: existingUser.name,
          email: existingUser.email,
          id: existingUser._id,
          avatarPicture: existingUser.avatarPicture,
        },
        token,
      });
    }
  }
};

const getProfile = (req, res) => {
  console.log("req.user", req.user);
  res.status(200).json({
    email: req.user.email,
    userName: req.user.userName,
    avatar: req.user.avatarPicture,
  });
};

const deleteUser = async (req, res) => {
  const deleteUser = await User.deleteOne({ email: req.user.email });
  res.status(200).json({
    msg: "account deleted",
  });
};

const updateProfile = async (req, res) => {
  const updateUser = await User.updateOne(
    { email: req.user.email },
    {
      name: req.body.name,
      email: req.body.email,
      avatarPicture: req.body.avatarPicture,
    },
    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(docs);
      }
    }
  );
};

export {
  uploadUserPicture,
  signUp,
  logIn,
  getProfile,
  deleteUser,
  updateProfile,
};
