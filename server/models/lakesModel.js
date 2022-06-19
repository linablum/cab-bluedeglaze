import mongoose from "mongoose";
const { Schema } = mongoose;

const lakeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  area: String,
  location: String,
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  meta: {
    bookmark: Number,
    likes: Number,
  },
});

const Lake = mongoose.model("Lake", lakeSchema);

export default Lake;
