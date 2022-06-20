import mongoose from "mongoose";
const { Schema } = mongoose;

const lakeDetailSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Lake" },
  author: { type: Schema.Types.ObjectId, ref: "User", select: ["name"] },
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
  author: String,
  distancecenter: Number,
  tipps: {
    author: String,
    comment: String,
    date: Date,
  },
  //  image:
});

const LakeDetail = mongoose.model("LakeDetail", lakeDetailSchema);

export default LakeDetail;
