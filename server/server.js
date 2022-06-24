import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import lakesRoute from "./routes/lakesRoute.js";
import lakeDetailsRoute from "./routes/lakeDetailsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import passportConfig from "./config/passportConfig.js";
import passport from "passport";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
};

const loadRoutes = () => {
  app.use("/api/lakes", lakesRoute);
  app.use("/api/lakedetails", lakeDetailsRoute);
  app.use("/api/users", usersRoute);
};

const middlewareSetup = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const corsOptions = {
    origin: "http://localhost:3000", // or '*'
    credentials: true,
  };
  app.use(cors(corsOptions));
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);
};

const mongoDbConection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to Mongo DB established");
  } catch (error) {
    console.log("error connection to Mongo DB", err);
  }
};

(async () => {
  mongoDbConection();
  middlewareSetup();
  loadRoutes();
  startServer();
})();
