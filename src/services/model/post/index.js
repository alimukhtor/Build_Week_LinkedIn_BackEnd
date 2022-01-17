import express from "express"
import PostModel from "../../schema/post/schema.js"

const postRouter = express.Router()


// Post new post

postRouter.post("/", async (req, res, next) => {
    try {
        const newPost = new PostModel(req.body)
        const { _id } = await newPost.save()
        res.send( _id )
    } catch (error) {
        next(error)
    }
})

// Post image to post

postRouter.post("/:postId", async (req, res, next) => {
    try {
        const postImage = new ImageModel(req.body)
        const { _id } = await postImage.save()
        res.send( _id )
    } catch (error) {
        next(error)
    }
})

// Get Posts

postRouter.get("/", async (req, res, next) => {
    try {
        const allPosts = await PostModel.find()
        res.send(allPosts)
    } catch (error) {
        next(error)
    }
})

// Get Single Post

postRouter.get("/:postId", async (req, res, next) => {
    try {
        const singlePost = await PostModel.findById(req.params.postId)
        if(singlePost) {
            res.send(singlePost) 
        } else {
            next(createHttpError(404, `Post with id ${req.params.postId} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

// Edit Post

postRouter.put("/:postId", async (req, res, next) => {
    try {
        const postId = req.params.postId
        const editedPost = await PostModel.findByIdAndUpdate(postId, req.body, { new: true })
        if (editedPost) {
            res.send(editedPost)
        } else {
            next(createHttpError(404, `Post with id ${postId} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

postRouter.delete("/:postId", async (req, res, next) => {
    try {
        const postId = req.params.postId
        const deletedPost = await PostModel.findByIdAndDelete(postId)
        if (deletedPost) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Post with id ${postId} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

export default postRouter