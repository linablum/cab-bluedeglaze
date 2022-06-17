import mongoose from "mongoose";

const lakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
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
