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
    username: { type: String, required: true},
    image:{type:String, default:"Image()"},
    user: [{ type:Schema.Types.ObjectId, ref:"Profile" }],
  },
  {
    timestamps: true,
  }
);

export default model("Experience", experienceSchema);
