import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    balance: { type: Number, default: 0 },
    deposited: { type: Number, default: 0 },
    withdrawn: { type: Number, default: 0 },
    plan: { type: String, default: "None" },
    isApproved: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false, },
  },
  { timestamps: true }
)

const User = mongoose.model("User", UserSchema);
export default User;