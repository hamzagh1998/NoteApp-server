import { Schema, model } from "mongoose";

const ChecklistSchema = new Schema({
    title: {type: "string", required: true},
    items: [String],
    secure: {type: "boolean", default: false},
    password: {type: "string", required: false},
    owner: {type: Schema.Types.ObjectId, ref: "User"}
  },
  { timestamps: true }
);

export const ChecklistModel = model("Checklist", ChecklistSchema);