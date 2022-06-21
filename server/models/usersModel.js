import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
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
  addedlakes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lake",
    },
  ],
  avatarPicture: String,
  likes: Number,
  bookmarks: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
