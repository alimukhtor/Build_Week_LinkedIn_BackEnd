import mongoose from "mongoose"
import { profileSchema } from "../../schema/profile/schema.js"

const { Schema, model } = mongoose

const PostSchema = new Schema({
    text: { type: String},
    username: { type: String},
    image: { type: String },
    user: {default: {}, type: profileSchema},
},
{ timestamps: true },
)

export default model("Post", PostSchema)