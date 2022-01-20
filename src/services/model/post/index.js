import express from "express"
import PostModel from "../../schema/post/schema.js"
import UserModel from "../../schema/profile/schema.js"
import multer from "multer"
import { v2 as Cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import createHttpError from "http-errors"

Cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  })

const postRouter = express.Router()

const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
      folder: 'linkedIn',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => 'new',
    },
  })
   
const parser = multer({ storage: storage })


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

// Post Image to Post

postRouter.post("/:postId/image", parser.single('image'), async (req, res, next) => {
    try {
        //postModel => findById using :postId => 
        //PostModel update => image: req.file.path => 
        //res.json(editedPost)
        const postId = req.params.postId
        let editedPost = await PostModel.findById(postId);
        if (editedPost) {
            await editedPost.updateOne({image: req.file.path})
            res.send(editedPost)
        } else {
            next(createHttpError(404, `Post with id ${req.params.postId} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

// Get Post Image

postRouter.get("/:postId/image", async (req, res, next) => {
    try {
        const image = await PostModel.findById(req.params.postId)
        res.send(image)
    } catch (error) {
        next(error)
    }
})

// Get Posts

postRouter.get("/", async (req, res, next) => {
    try {
        const allPosts = await PostModel.find()
        allPosts.forEach(async post => {
            let user = await UserModel.findOne({ username: "PMur" })
            post.user = user
            console.log(post)
            console.log(user)
        })
        res.send(allPosts)
    } catch (error) {
        next(error)
    }
})

// Get Single Post

postRouter.get("/:postId", async (req, res, next) => {
    try {
        const singlePost = await PostModel.findById(req.params.postId).populate({ path: "user"})
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

// UserModel.
//   find().
//   where('username').equals('Tennis').
//   where('age').gt(17).lt(50).  //Additional where query
//   limit(5).
//   sort({ age: -1 }).
//   select('username').
//   exec(callback); // where callback is the name of our callback function.