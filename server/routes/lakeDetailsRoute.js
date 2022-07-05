import express from "express";
import {
  getAllLakeDetails,
  getLakeById,
} from "../controller/lakeDetailsController.js";

const router = express.Router();

router.get("/all", getAllLakeDetails);
router.get("/:id", getLakeById);

export default router;
