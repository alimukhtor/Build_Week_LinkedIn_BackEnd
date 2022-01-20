import express from 'express'
import ProfileModel from '../../schema/profile/schema.js'
import {getPDFReadableStream} from '../../library/pdf-tools.js'
import { pipeline } from 'stream'
const profileRouter = express.Router()

// ************* POST USER PROFILE 

profileRouter.post("/", async(req, res, next)=> {
    try {
        const profiles = new ProfileModel(req.body)
        const {_id} = await profiles.save()
        res.send({_id})
    } catch (error) {
        next(error)
    }
})

// ************* GET ALL PROFILES 

profileRouter.get("/", async(req, res, next)=> {
    try {
        const profiles = await ProfileModel.find(req.body)
        res.send(profiles)
    } catch (error) {
        next(error)
    }
})

// ************* GET BY ID 

profileRouter.get("/:userId", async(req, res, next)=> {
    try {
        const userId = await ProfileModel.findById(req.params.userId)
        res.send(userId)
    } catch (error) {
        next(error)
    }
})


// ************* UPDATE  

profileRouter.put("/:userId", async(req, res, next)=> {
    try {
        const updateProfile = await ProfileModel.findByIdAndUpdate(req.params.userId, req.body, {new:true})
        res.send(updateProfile)

    } catch (error) {
        next(error)
    }
})

// ************* DELETE 
profileRouter.delete("/:userId", async(req, res, next)=> {
    try {
        const deleteProfile = await ProfileModel.findByIdAndDelete(req.params.userId)
        res.send()
    } catch (error) {
        next(error)
    }
})

// ************* GET PROFILE AS PDF 

profileRouter.get("/:userId/CV", async(req, res, next)=> {
    try {
        const filterId = await ProfileModel.findById(req.params.userId)
        
        res.setHeader("Content-Disposition", "attachment; filename=userProfile.pdf") 
        console.log("Filter:", filterId);
        const source =  getPDFReadableStream(filterId)
        const destination = res
        pipeline(source, destination, err => {
            if(err) next(err);
            console.log("Downloaded successfully!");
        })
    } catch (error) {
        next(error)
    }
})

// ************* UPLOAD IMAGE 

profileRouter.post("/:userId/uploadImage", async(req, res, next)=> {})



// **************** GET /:userName/experiences

profileRouter.post("/:username/experiences", async(req, res, next)=>{
    try {
        //GET /username/exp = no body
        const user = await ProfileModel.find({username: req.params.username})
        const experiences = await Exp.find({username: user.username}) 

        res.send({...user, ...experiences})
        //POST 

        //send username in the body
        const newExp = new Exp(req.body).save()


        console.log("Username is :", user.username);
        if(user){
            const postExpr = { ...user.toObject(), role: req.body.role, company:req.body.company} 
            // console.log("Poste comment:", postComment);
            const modifyBlog = await ProfileModel.findByIdAndUpdate(req.params.userId, {$push:{experiences:postExpr}}, {new:true})
            // const {_id} = await user.save()
            console.log("Body", modifyBlog);
        
            res.send(modifyBlog)
        }
    } catch (error) {
        next(error)
    }
})

// **************** POST /:userName/experiences
// **************** GET /:userName/experiences/:expId
// **************** UPDATE /:userName/experiences/:expId
// **************** DELETE /:userName/experiences/:expId
// **************** POST /:userName/experiences/:expId/picture
// **************** GET /:userName/experiences/:expId/CSV


export default profileRouter