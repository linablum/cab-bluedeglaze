import express from "express";
import { signUp, uploadUserPicture } from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);

export default router;
