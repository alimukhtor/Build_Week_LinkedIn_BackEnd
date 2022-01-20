import express from "express";

// import createHttpError from "http-errors";
import ExperienceModel from "../../schema/experience/schema.js";
import ProfileModel from '../../schema/profile/schema.js'

const experienceRouter = express.Router();

experienceRouter.post("/:username/experiences", async (req, res, next) => {
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

experienceRouter.get("/:username/experiences", async (req, res, next) => {
  try {
    console.log(req.params.username);
    const experience = await ExperienceModel.find({
      name: req.params.username,
    })
    // const allExpr = await ExperienceModel.find().populate("user")
    //     allExpr.forEach(expr => {
    //       ProfileModel.find({ username: expr.username })
    //     })
    //     res.send(allExpr)
    res.send(experience);
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

export default experienceRouter;
