import express from "express";
import {
  getAllLakeDetails,
  getLakesById,
} from "../controller/lakeDetailsController.js";

const router = express.Router();

router.get("/all", getAllLakeDetails);
router.get("/:id", getLakesById);

export default router;
