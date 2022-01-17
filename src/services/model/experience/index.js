import express from "express";
// import createHttpError from "http-errors";
import ExperienceModel from "../../schema/experience/schema.js";

const experienceRouter = express.Router();

experienceRouter.post("/", async (req, res, next) => {
  try {
    const newExperience = new ExperienceModel(req.body);
    const { _id } = await newExperience.save();

    res.status(201).send(newExperience);
  } catch (error) {
    next(error);
  }
});

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
