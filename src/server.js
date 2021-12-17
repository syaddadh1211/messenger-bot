require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

let app = express();

//config view engine
configViewEngine(app);

//init all web routes
initWebRoutes(app);

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
