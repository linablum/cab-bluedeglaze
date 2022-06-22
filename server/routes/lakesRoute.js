import express from "express";
import { getAllLakes, getLakesByArea } from "../controller/lakesController.js";

const router = express.Router();

router.get("/lakes", getAllLakes);
router.get("/:area", getLakesByArea);

export default router;
