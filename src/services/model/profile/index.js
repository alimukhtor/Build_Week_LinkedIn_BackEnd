import express from "express";
import ProfileModel from "../../schema/profile/schema.js";
import { getPDFReadableStream } from "../../library/pdf-tools.js";
import { pipeline } from "stream";
const profileRouter = express.Router();

// ************* POST USER PROFILE

profileRouter.post("/", async (req, res, next) => {
  try {
    const profiles = new ProfileModel(req.body);
    const { _id } = await profiles.save();
    res.send({ _id });
  } catch (error) {
    next(error);
  }
});

// ************* GET ALL PROFILES

profileRouter.get("/", async (req, res, next) => {
  try {
    const profiles = await ProfileModel.find(req.body);
    res.send(profiles);
  } catch (error) {
    next(error);
  }
});

// ************* GET BY ID

profileRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = await ProfileModel.findById(req.params.userId);
    res.send(userId);
  } catch (error) {
    next(error);
  }
});

// ************* UPDATE

profileRouter.put("/:userId", async (req, res, next) => {
  try {
    const updateProfile = await ProfileModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.send(updateProfile);
  } catch (error) {
    next(error);
  }
});

// ************* DELETE
profileRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deleteProfile = await ProfileModel.findByIdAndDelete(
      req.params.userId
    );
    res.send();
  } catch (error) {
    next(error);
  }
});

// ************* GET PROFILE AS CV

profileRouter.get("/:userId/CV", async (req, res, next) => {
  try {
    const author = await getAuthors();
    const filterId = await ProfileModel.find(
      (index) => index._id === request.params.userId
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=userProfile.pdf"
    );
    const source = getPDFReadableStream(filterId);
    // const transform = createGzip()
    const destination = response;
    pipeline(source, destination, (err) => {
      if (err) next(err);
      console.log("Downloaded successfully!");
    });
  } catch (error) {
    next(error);
  }
});

// ************* UPLOAD IMAGE

profileRouter.post("/:userId/uploadImage", async (req, res, next) => {});

export default profileRouter;
