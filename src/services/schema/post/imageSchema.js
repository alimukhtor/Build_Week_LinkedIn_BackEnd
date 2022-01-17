import mongoose from "mongoose"

const { Schema } = mongoose

const imageSchema = new Schema({
    image: { type: String, default: 'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png' }
},
{ timestamps: true },
)

export default imageSchema