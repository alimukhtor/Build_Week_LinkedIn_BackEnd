import mongoose from 'mongoose'

const {Schema, model} = mongoose

const profileSchema = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    email:{type:String},
    bio:{type:String},
    title:{type:String},
    area:{type:String},
    image:{type:String, default:"Image()"},
    username:{type:String, unique:true, required:true}
    
},
{
    timestamps:true
})

export default model("Profile", profileSchema)