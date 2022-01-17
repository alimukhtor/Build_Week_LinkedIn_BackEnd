import mongoose from "mongoose"
import UserSchema from "../../schema/profile/schema.js"
import ImageSchema from "../../schema/post/imageSchema.js";

const { Schema, model } = mongoose

const PostSchema = new Schema({
    text: { type: String, required: true },
    image: [ImageSchema],
    user: [UserSchema],
},
{ timestamps: true },
)

export default model("Post", PostSchema)