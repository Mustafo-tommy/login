import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default model("User", userSchema);
