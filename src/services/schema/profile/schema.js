import mongoose from 'mongoose'
const {Schema, model} = mongoose

// "_id": "5d925e677360c41e0046d1f5",  //server generated
// "role": "CTO",
// "company": "Strive School",
// "startDate": "2019-06-16T22:00:00.000Z",
// "endDate": "2019-06-16T22:00:00.000Z", //could be null
// "description": "Doing stuff here and there",
// "area": "Berlin",
// "username": "admin",
// "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
// "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
// "image": ... //server generated on upload, set a default here


export const profileSchema = new Schema({
    name:{type:String},
    surname:{type:String},
    email:{type:String},
    bio:{type:String},
    title:{type:String},
    area:{type:String},
    image:{type:String, default:"Image()"},
    username:{type:String, unique:true, required:true},
    
},
{
    timestamps:true
})

export default model("Profile", profileSchema)