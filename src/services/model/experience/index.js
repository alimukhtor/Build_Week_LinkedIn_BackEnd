import express from "express";
import json2csv from 'json2csv'
import fs from "fs-extra"
// import createHttpError from "http-errors";
const {createReadStream} = fs
import ExperienceModel from "../../schema/experience/schema.js";
import { v2 as Cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import ProfileModel from "../../schema/profile/schema.js"

Cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  })

const experienceRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
      folder: 'linkedIn',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => 'new',
    },
  })
   
const parser = multer({ storage: storage })

experienceRouter.post("/:username", async (req, res, next) => {
  try {
    const dataToInsert = req.body;
    dataToInsert.username = req.params.username;

    const newExperience = new ExperienceModel(dataToInsert);
    await newExperience.save();

    res.status(201).send(newExperience);
  } catch (error) {
    next(error);
  }
});

// Post Image to Experience

experienceRouter.post("/:username/experiences/:experienceId/picture", parser.single('image'), async (req, res, next) => {
  try {
      res.json(req.file)
  } catch (error) {
      next(error)
  }
})

// postRouter.get("/", async (req, res, next) => {
//   try {
//       const allPosts = await PostModel.find()
//       allPosts.forEach(async post => {
//           let user = await UserModel.findOne({ username: "PMur" })
//           post.user = user
//           console.log(post)
//           console.log(user)
//       })
//       res.send(allPosts)
//   } catch (error) {
//       next(error)
//   }
// })

experienceRouter.get("/", async (req, res, next) => {
  try {
    console.log(req.params.username);
    // const experience = await ExperienceModel.find({
    //   name: req.params.username,
    // })
    const allExpr = await ExperienceModel.find()
        allExpr.forEach(async expr => {
          let experience = await ProfileModel.findOne({ username: expr.username })
          expr.experience = experience
          console.log(experience)
        })
        res.send(allExpr)
  } catch (error) {
    next(error);
  }
});

experienceRouter.get(
  "/:username/experiences/:experienceId",
  async (req, res, next) => {
    try {
      const experience = await ExperienceModel.find({
        username: req.params.username,
        _id: req.params.experienceId,
        function(err, doc) {
          return err ? err : doc;
        },
      });

      res.send(experience);
    } catch (error) {
      next(error);
    }
  }
);

experienceRouter.put(
  "/:username/experiences/:experienceId",
  async (req, res, next) => {
    try {
      const updatedExperience = await ExperienceModel.findByIdAndUpdate(
        req.params.experienceId,
        req.body,
        {
          new: true,
        }
      );
      if (updatedExperience) {
        res.send(updatedExperience);
      } else {
        next(
          createHttpError(404, `experience with id ${experienceId} not found!`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

experienceRouter.delete(
  "/:username/experiences/:experienceId",
  async (req, res, next) => {
    try {
      const deletedExperience = await ExperienceModel.findByIdAndDelete(
        req.params.experienceId
      );
      if (deletedExperience) {
        res.status(204).send();
      } else {
        next(
          createHttpError(404, `experience with id ${experienceId} not found!`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

experienceRouter.get("/:username/experiences/CSV", async(req, res, next)=> {
  try {
    const experience = await ExperienceModel.find(req.body)
    const getExprsReadableStream =()=> createReadStream(experience)
    res.setHeader("Content-Disposition", "attachment; filename=expr.csv") 
    const source = getExprsReadableStream()
    const transform = new json2csv.Transform({fields: ["role", "company", "description", "area", "startDate", "endDate"]})
    const destination = res
    pipeline(source, transform, destination, err=> {
        if(err) next(err)
    })
  } catch (error) {
    next(error)
  }
})

export default experienceRouter;
