import mongoose from "mongoose"

const { Schema, model } = mongoose

const ImageSchema = new Schema({
    image: { data: Buffer, contentType: String },
},
{ timestamps: true },
)

export default model("Image", ImageSchema)