import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import experienceRouter from "./services/model/experience/index.js";

const whiteList = [process.env.FE_LOCAL_URL, process.env.FE_REMOTE_URL];

const corsOptions = {
    origin: function (origin, next) {
        console.log(origin);
        if (!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true);
        } else {
            next(new Error("Not allowed by CORS"));
        }
    },
};

const server = express();

// ************************************* IMPORT ROUTERS *************************

import profileRouter from "./services/model/profile/index.js";
import postRouter from "./services/model/post/index.js";

// ************************************* MIDDLEWARES *****************************

server.use(cors(corsOptions));
server.use(express.json());

//  ****************************************** ROUTES **************************

server.use("/profiles", profileRouter);
server.use("/post", postRouter);
server.use("/profile", experienceRouter);


// ******************* MONGO CONNECTION *********************
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_DB);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");

  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});
