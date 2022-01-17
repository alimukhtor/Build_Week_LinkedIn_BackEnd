import express from "express"
import PostModel from "../../schema/post/schema.js"
import ImageModel from "../../schema/post/imageSchema.js"
import multer from "multer"
import fs from "fs-extra"

const postRouter = express.Router()

// SET STORAGE
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })


let upload = multer({ storage: storage })

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

postRouter.post("/:postId/image", upload.single('postImage'), async (req, res, next) => {
    try {
        let img = fs.readFileSync(req.file.path)
        let encode_img = img.toString('base64')
        let final_img = {
            contentType:req.file.mimetype,
            image: Buffer.from(encode_img,'base64')
        }
        ImageModel.create(final_img, function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result.img.Buffer);
                console.log("Saved To database");
                res.contentType(final_img.contentType);
                res.send(final_img.image);
            }
        })
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