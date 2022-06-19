import LakeDetail from "../models/lakesDetailsModel.js";

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

export { getAllLakeDetails };
