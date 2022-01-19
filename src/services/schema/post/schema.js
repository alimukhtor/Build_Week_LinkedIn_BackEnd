import mongoose from "mongoose"

const { Schema, model } = mongoose

const PostSchema = new Schema({
    text: { type: String, required: true },
    username: { type: String, required: true},
    image: { type: String },
    user: [{ type:Schema.Types.ObjectId, ref:"Profile" }],
},
{ timestamps: true },
)

export default model("Post", PostSchema)