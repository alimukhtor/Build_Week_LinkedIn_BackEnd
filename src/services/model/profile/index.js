import express from 'express'
import ProfileModel from '../../schema/profile/schema.js'

const profileRouter = express.Router()


profileRouter.post("/", async(req, res, next)=> {
    try {
        const profiles = new ProfileModel(req.body)
        const {_id} = await profiles.save()
        res.send({_id})
    } catch (error) {
        next(error)
    }
})
profileRouter.get("/", async(req, res, next)=> {
    try {
        const profiles = await ProfileModel.find(req.body)
        res.send(profiles)
    } catch (error) {
        next(error)
    }
})
profileRouter.get("/:userId", async(req, res, next)=> {
    try {
        const userId = await ProfileModel.findById(req.params.userId)
        res.send(userId)
    } catch (error) {
        next(error)
    }
})
profileRouter.put("/:userId", async(req, res, next)=> {
    try {
        const updateProfile = await ProfileModel.findByIdAndUpdate(req.params.userId, req.body, {new:true})
        res.send(updateProfile)

    } catch (error) {
        next(error)
    }
})
profileRouter.get("/:userId/CV", async(req, res, next)=> {})
profileRouter.post("/:userId/uploadImage", async(req, res, next)=> {})


export default profileRouter