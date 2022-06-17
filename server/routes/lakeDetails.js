import express from "express";
import { getAllLakeDetails } from "../controller/lakeDetailsController.js";

const router = express.Router();

router.get("/all", getAllLakeDetails);

export default router;
