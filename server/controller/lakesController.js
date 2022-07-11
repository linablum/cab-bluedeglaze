import Lake from "../models/lakesModel.js";
import { v2 as cloudinary } from "cloudinary";

const getAllLakes = async (req, res) => {
  try {
    const allLakes = await Lake.find({});
    res.status(200).json(allLakes);
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Something went wrong with the server." });
  }
};
const getLakesByArea = async (req, res) => {
  try {
    const lakesByArea = await Lake.find({
      area: req.params.area,
    }).exec();
    res.status(200).json({ lakesByArea, number: lakesByArea.length });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Something went wrong with the server.",
    });
  }
};

/* const getLakesByArea = async (req, res) => {
  const { likes } = req.query;
  // no lakes with that amount of likes
  if (likes) {
    const lakesByArea = await Lake.find({
      area: req.params.area,
      "likes": { $gte: likes },
    })
      .populate({ path: "author" })
      .exec();
    res.status(200).json({ lakesByArea, number: lakesByArea.length });
  } else {
    try {
      const lakesByArea = await Lake.find({ area: req.params.area })
        .populate({ path: "author" })
        .exec();
      if (lakesByArea.length === 0) {
        res.status(200).json({ message: "No area found" });
      }
      res.status(204).json(lakesByArea);
      console.log(lakesByArea);
    } catch (error) {
      res.status(500).json({
        error: error,
        message: "Something went wrong with the server.",
      });
    }
  }
}; */

const uploadLakePicture = async (req, res) => {
  try {
    console.log("req.file", req.file);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "bluedeglaze-lakes",
    });
    console.log("result", uploadResult);
    res.status(200).json({
      message: "Image succesfully uploaded.",
      imageUrL: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Image couldn't be uploaded.", error: error });
  }
};

const addNewLake = async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await Lake.findOne({ name: req.body.name });
    if (existingUser) {
      res.status(409).json({ message: "Lake already exists!" });
    } else {
      const NewLake = new Lake({
        name: req.body.name,
        area: req.body.area,
        location: req.body.location,
        shortDescription: req.body.shortDescription,
        lakePicture: req.body.lakePicture,
        author: req.body.author,
      });
      try {
        const savedLake = await NewLake.save();
        res.status(201).json({
          lake: {
            name: savedLake.name,
            area: savedLake.area,
            location: savedLake.location,
            shortDescription: savedLake.shortDescription,
            lakePicture: savedLake.lakePicture,
            author: savedLake.author,
          },
          message: "Lake added",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "Error while saving new lake.", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "Adding a lake not possible.", error: error });
  }
};

const editLake = async () => {};

const addFavourite = async (req, res) => {
  try {
    console.log(req.body);
    const doc = await Lake.findById(req.body.id);
    doc.likes = req.body.userName;
    await doc.save();
    res.status(201).json({
      message: "You liked that lake",
    });
  } catch (error) {
    res.status(409).json({ message: "Error while saving.", error: error });
  }
};

const getFavourites = async (req, res) => {
  try {
    console.log("username", req.params.userName);
    const favs = await Lake.find({
      likes: req.params.userName,
    }).exec();
    res.status(200).json(favs);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Something went wrong getting all your favourites.",
    });
  }
};

export {
  getAllLakes,
  getLakesByArea,
  addNewLake,
  uploadLakePicture,
  editLake,
  addFavourite,
  getFavourites,
};
