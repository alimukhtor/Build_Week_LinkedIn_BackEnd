import mongoose from "mongoose";

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
    user: [{type:Schema.Types.ObjectId, ref:"Profile"}],
  },
  { timestamps: true }
);

export default model("Experience", experienceSchema);
