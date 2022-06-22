import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    equired: true,
  },
  avatarPicture: String,
  likes: Number,
  bookmarks: Number,
  addedlakes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lake",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
