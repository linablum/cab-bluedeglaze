import express from "express";
import {
  getAllLakes,
  getLakesByArea,
  addNewLake,
  uploadLakePicture,
  editLake,
} from "../controller/lakesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllLakes);
router.get("/:area", getLakesByArea);
router.post("/newlake", addNewLake);
router.post("/editlake", editLake);
router.post("/imageUpload", multerUploads.single("image"), uploadLakePicture);

export default router;
