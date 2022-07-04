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
  author: { type: Schema.Types.ObjectId, ref: "User" },
  meta: {
    bookmarks: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
});

const Lake = mongoose.model("Lake", lakeSchema);

export default Lake;
