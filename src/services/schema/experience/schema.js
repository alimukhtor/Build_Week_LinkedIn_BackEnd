import mongoose from "mongoose";

const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    role: { type: String},
    company: { type: String},
    startDate:{type:Date},
    endDate:{type:Date},
    description: { type: String},
    area: { type: String},
    image:{type:String, default:"Image()"},
  },
  {
    timestamps: true,
  }
);

export default model("Experience", experienceSchema);
