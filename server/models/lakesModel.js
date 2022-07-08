import mongoose from "mongoose";
const { Schema } = mongoose;

const lakeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  area: String,
  location: String,
  lakePicture: String,
  shortDescription: String,
  author: String,
  /*  { type: Schema.Types.ObjectId, ref: "User" }, */
  meta: {
    bookmarks: { type: Array },
    likes: { type: Array },
  },
});

const Lake = mongoose.model("Lake", lakeSchema);

export default Lake;
