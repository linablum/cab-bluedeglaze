import express from "express";
import { getAllLakes } from "../controller/lakesController.js";

const router = express.Router();

router.get("/all", getAllLakes);

export default router;
