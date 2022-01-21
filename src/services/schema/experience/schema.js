import mongoose from "mongoose";
import { profileSchema } from "../../schema/profile/schema.js"

const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    role: { type: String},
    company: { type: String},
    description: { type: String},
    area: { type: String},
    startDate: { type: Date},
    endDate: { type: Date},
    image:{type:String, default:"Image()"},
    username:{type:String},
    user: {default: {}, type: profileSchema},
  },
  { timestamps: true }
);

export default model("Experience", experienceSchema);
