import LakeDetail from "../models/lakesDetailsModel.js";
import Lake from "../models/lakesModel.js";

const getAllLakeDetails = async (req, res) => {
  try {
    const allLakeDetails = await LakeDetail.find({});
    res.status(200).json(allLakeDetails);
    console.log(allLakeDetails);
  } catch {
    res
      .status(500)
      .json({ error: error, message: "Something went wrong with the server." });
  }
};

const getLakeById = async (req, res) => {
  try {
    const lakeById = await Lake.find({ _id: req.params.id }).exec();
    res.status(200).json({ lakeById, number: lakeById.length });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Something went wrong with the server.",
    });
  }
};

export { getAllLakeDetails, getLakeById };
