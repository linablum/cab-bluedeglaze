import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});

const User = mongoose.model("user", userSchema);

export default User;
