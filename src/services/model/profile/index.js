import express from 'express'
import ProfileModel from '../../schema/profile/schema.js'

const profileRouter = express.Router()


profileRouter.post("/", async(req, res, next)=> {
    try {
        
    } catch (error) {
        next(error)
    }
})
profileRouter.get("/", async(req, res, next)=> {})
profileRouter.get("/:userId", async(req, res, next)=> {})
profileRouter.put("/:userId", async(req, res, next)=> {})
profileRouter.get("/:userId/CV", async(req, res, next)=> {})
profileRouter.post("/:userId/uploadImage", async(req, res, next)=> {})


export default profileRouter