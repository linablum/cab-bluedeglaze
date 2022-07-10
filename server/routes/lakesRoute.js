import express from "express";
import {
  getAllLakes,
  getLakesByArea,
  addNewLake,
  uploadLakePicture,
  editLake,
  addFavourite,
} from "../controller/lakesController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllLakes);
router.get("/:area", getLakesByArea);
router.post("/newlake", addNewLake);
router.post("/editlake", editLake);
router.post("/imageUpload", multerUploads.single("image"), uploadLakePicture);
router.post("/favourite", jwtAuth, addFavourite);

export default router;
