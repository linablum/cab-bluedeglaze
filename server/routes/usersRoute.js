import express from "express";
import {
  signUp,
  uploadUserPicture,
  logIn,
  getProfile,
  deleteUser,
} from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/profile", jwtAuth, getProfile);
router.post("/delete", jwtAuth, deleteUser);

export default router;
