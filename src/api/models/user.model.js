import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {type: "string", required: true},
  email: {type: "string", resuired: true, unique: true},
  photoUrl: {
    type: String, 
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    required: true,
  }
});

export const UserModel = model("User", UserSchema);