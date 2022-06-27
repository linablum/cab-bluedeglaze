import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 30,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  //role: String,
  avatarPicture: {
    type: String,
    //  default:"",
  },
  likes: {
    type: Array,
    default: [],
  },
  bookmarks: {
    type: Array,
    default: [],
  },
  addedlakes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lake",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
