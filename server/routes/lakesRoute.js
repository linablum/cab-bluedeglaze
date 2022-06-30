import express from "express";
import {
  getAllLakes,
  getLakesByArea,
  addNewLake,
} from "../controller/lakesController.js";

const router = express.Router();

router.get("/all", getAllLakes);
router.get("/:area", getLakesByArea);
router.post("/newlake", addNewLake);

export default router;
