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
    const existingMail = await User.findOne({ email: req.body.email });
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingMail) {
      res.status(409).json({ message: "This email adress is already used." });
    } else if (existingUser) {
      res.status(409).json({
        message: "User already exists. Please choose another username.",
      });
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
    id: req.user.id,
    email: req.user.email,
    userName: req.user.userName,
    name: req.user.name,
    avatar: req.user.avatarPicture,
  });
  console.log(req.user.id);
};

const deleteUser = async (req, res) => {
  const deleteUser = await User.deleteOne({ email: req.user.email });
  res.status(200).json({
    msg: "account deleted",
  });
};

/* const updateProfile = async (req, res) => {
  const updateUser = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      userName: req.body.name,
      name: req.body.name,
      email: req.body.email,
      avatarPicture: req.body.avatarPicture,
    }
  );
  res.status(200).json({
    msg: "account updated",
    userName: req.user.userName,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatarPicture,
  });
}; */

/* const updateProfile = async (req, res) => {
  console.log(req.body._id);
  try {
  const hashedPassword = await encryptPassword(req.body.password);
    const doc = await User.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      avatarPicture: req.body.avatarPicture,
    });
    res.status(201).json({
      message: "User profile updated",
    });
  } catch (error) {
    res.status(409).json({ message: "Error while saving.", error: error });
  }
}; */

const updateProfile = async (req, res) => {
  try {
    const doc = await User.findById(req.body.id);
    doc.name = req.body.name;
    doc.email = req.body.email;
    doc.avatarPicture = req.body.avatarPicture;
    const hashedPassword = await encryptPassword(req.body.password);
    doc.password = hashedPassword;
    /*    {   userName: req.body.name,
      name: req.body.name,
      email: req.body.email,
      avatarPicture: req.body.avatarPicture,
    }; */
    await doc.save();
    res.status(201).json({
      message: "User profile updated",
    });
  } catch (error) {
    res.status(409).json({ message: "Error while saving.", error: error });
  }
};

export {
  uploadUserPicture,
  signUp,
  logIn,
  getProfile,
  deleteUser,
  updateProfile,
};
