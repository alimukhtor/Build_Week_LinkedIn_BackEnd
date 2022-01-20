import mongoose from "mongoose";
import { profileSchema } from "../../schema/profile/schema.js"

const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    area: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image:{type:String, default:"Image()"},
    user: {default: {}, type: profileSchema},
  },
  { timestamps: true }
);

export default model("Experience", experienceSchema);
