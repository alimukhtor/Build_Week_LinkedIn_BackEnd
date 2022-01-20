import express from "express";
// import createHttpError from "http-errors";
import ExperienceModel from "../../schema/experience/schema.js";
import { v2 as Cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

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

experienceRouter.post("/:userNanme", async (req, res, next) => {
  try {
    const newExperience = new ExperienceModel(req.body);
    const { _id } = await newExperience.save();

    res.status(201).send(newExperience);
  } catch (error) {
    next(error);
  }
});

// Post Image to Post

experienceRouter.post("/:username/experiences/:experienceId/picture", parser.single('image'), async (req, res, next) => {
  try {
      res.json(req.file)
  } catch (error) {
      next(error)
  }
})

experienceRouter.get("/", async (req, res, next) => {
  try {
    const experience = await ExperienceModel.find();
    res.send(experience);
  } catch (error) {
    next(error);
  }
});

experienceRouter.get("/:experienceId", async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;

    const experience = await ExperienceModel.findById(experienceId);
    if (experience) {
      res.send(experience);
    } else {
      next(
        createHttpError(404, `experience with id ${experienceId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

experienceRouter.put("/:experienceId", async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;
    const updatedExperience = await ExperienceModel.findByIdAndUpdate(
      experienceId,
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
});

experienceRouter.delete("/:experienceId", async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;
    const deletedExperience = await ExperienceModel.findByIdAndDelete(
      experienceId
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
});

export default experienceRouter;
