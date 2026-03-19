import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,

      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
