import mongoose from "mongoose"
import { profileSchema } from "../../schema/profile/schema.js"

const { Schema, model } = mongoose

const PostSchema = new Schema({
    text: { type: String, required: true },
    username: { type: String, required: true},
    image: { type: String },
    user: {default: {}, type: profileSchema},
},
{ timestamps: true },
)

export default model("Post", PostSchema)