import Lake from "../models/lakesModel.js";

const getAllLakes = async (req, res) => {
  try {
    const allLakes = await Lake.find({});
    res.status(200).json(allLakes);
    console.log(allLakes);
  } catch {
    res
      .status(400)
      .json({ error: error, message: "Something went wrong with the server." });
  }
};

export { getAllLakes };
