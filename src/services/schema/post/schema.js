import mongoose from "mongoose"
import UserSchema from "../../schema/profile/schema.js"

const { Schema, model } = mongoose

const PostSchema = new Schema({
    text: { type: String, required: true },
    image: { type: String, default: 'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png' },
    user: [UserSchema]
},
{ timestamps: true },
)

export default model("Post", PostSchema)