import express from "express";
import { getAllLakes, getLakesByArea } from "../controller/lakesController.js";

const router = express.Router();

router.get("/all", getAllLakes);
router.get("/:area", getLakesByArea);

export default router;
