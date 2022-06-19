import Lake from "../models/lakesModel.js";

const getAllLakes = async (req, res) => {
  try {
    const allLakes = await Lake.find({});
    res.status(200).json(allLakes);
    console.log(allLakes);
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Something went wrong with the server." });
  }
};

const getLakesByArea = async (req, res) => {
  /*   const { likes } = req.query;
  if (likes) {
    const lakesByArea = await Lake.find({
      area: req.params.area,
      likes: { $gte: likes },
    }).exec();
    res.status(200).json({ lakesByArea });
  } */
  try {
    const lakesByArea = await Lake.find({
      area: req.params.area,
    }).exec();
    if (lakesByArea.length === 0) {
      res.status(200).json({ message: "No area found" });
    }
    res.status(204).json(lakesByArea);
    console.log(lakesByArea);
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Something went wrong with the server." });
  }
};

export { getAllLakes, getLakesByArea };
