import mongoose from 'mongoose'

const {Schema, model} = mongoose

// "_id": "5d84937322b7b54d848eb41b", //server generated
// "name": "Diego",
// "surname": "Banovaz",
// "email": "diego@strive.school",
// "bio": "SW ENG",
// "title": "COO @ Strive School",
// "area": "Berlin",
// "image": ..., //server generated on upload, set a default here
// "username": "admin", //need to be unique
// "createdAt": "2019-09-20T08:53:07.094Z", //server generated
// "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
const profileSchema = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    email:{type:String},
    bio:{type:String},
    title:{type:String},
    area:{type:String},
    image:{type:String, default:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fcolored-powder-explosion-on-black-background-picture-id1057506940%3Fk%3D20%26m%3D1057506940%26s%3D612x612%26w%3D0%26h%3D3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmixing-colors&tbnid=sSAWficq0VlQLM&vet=12ahUKEwjtyYvZv7j1AhW5BhAIHZmVCPoQMygWegUIARCEAg..i&docid=s-jiZk9FqPm3MM&w=612&h=555&itg=1&q=images&ved=2ahUKEwjtyYvZv7j1AhW5BhAIHZmVCPoQMygWegUIARCEAg"},
    
},
{
    timestamps:true
})

export default model("Profile", profileSchema)