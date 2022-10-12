import { Schema, model } from "mongoose";

const NoteSchema = new Schema({
  title: {type: "string", required: true},
  imageUrl: {type: "string", required: false},
  content: {type: "string", required: false},
  owner: {type: Schema.Types.ObjectId, ref: "User"}
});

export const NoteModel = model("Note", NoteSchema);