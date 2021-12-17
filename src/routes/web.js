import express from "express";
import homepageController from "../controllers/homepageController";
import chatBotController from "../controllers/chatBotController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homepageController.getHomepage);
  router.get("/webhook", chatBotController.getWebHook);
  router.post("/webhook", chatBotController.postWebHook);
  return app.use("/", router);
};

module.exports = initWebRoutes;
