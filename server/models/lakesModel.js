import mongoose from "mongoose";

const lakeSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  area: String,
  location: String,
  //  review: {
  //    type: String,
  //  },
  meta: {
    bookmark: Number,
    favs: Number,
  },
});

const Lake = mongoose.model("Lake", lakeSchema);

export default Lake;
