import mongoose from "mongoose";

const lakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  review: {
    type: String,
  },
  adress: {
    type: String,
    //    required: true,
  },
  entry: {
    type: Boolean,
    //    required: true,
  },
  facilities: {
    kiosk: Boolean,
    restaurant: Boolean,
    playground: Boolean,
    tabletennis: Boolean,
    volleyball: Boolean,
    other: String,
  },
  fkk: Boolean,
  waterquality: String,
  parking: String,
  shadow: String,
  meta: {
    bookmark: Number,
    favs: Number,
  },
  author: String,
  distancecenter: Number,
  tipps: {
    author: String,
    comment: String,
    date: Date,
  },
  //  image:
});

const Lake = mongoose.model("Lake", lakeSchema);

export default Lake;
