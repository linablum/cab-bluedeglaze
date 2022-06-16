import express from "express";
import Lake from "../models/lakesModel.js";

const router = express.Router();

/* router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
}); */

router.get("/all", (req, res) => {
  Lake.find({}, function (err, lakes) {
    if (err) {
      res.send(err);
    } else {
      res.send(lakes);
    }
  });
});

export default router;
