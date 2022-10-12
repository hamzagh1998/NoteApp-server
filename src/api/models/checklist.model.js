import { Schema, model } from "mongoose";

const ChecklistSchema = new Schema({
  title: {type: "string", required: true},
  items: [{type: "string", required: false}],
  owner: {type: Schema.Types.ObjectId, ref: "User"}
});

export const ChecklistModel = model("Checklist", ChecklistSchema);