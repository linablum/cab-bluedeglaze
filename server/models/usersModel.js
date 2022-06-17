import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    //    required: true,
  },
  addedlakes: Array,
  image: String,
});

const User = mongoose.model("user", userSchema);

export default User;
