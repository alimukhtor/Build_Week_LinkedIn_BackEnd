import mongoose from "mongoose";

const { Schema, model } = mongoose;

const experienceSchema = new Schema(
  {
    role: { type: String},
    company: { type: String},
    description: { type: String},
    username: { type: String, required: true},
    area: { type: String},
    image:{type:String, default:"Image()"},
    user: [{ type:Schema.Types.ObjectId, ref:"Profile" }],
  },
  {
    timestamps: true,
  }
);

export default model("Experience", experienceSchema);
