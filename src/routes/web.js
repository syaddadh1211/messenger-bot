require("dotenv").config({ path: "./src/.env" });
import express from "express";
import homepageController from "../controllers/homepageController";
import chatBotController from "../controllers/chatBotController";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homepageController.getHomepage);
  return app.use("/", router);
};

module.exports = initWebRoutes;
