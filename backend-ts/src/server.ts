/**
 * Required External Modules
 */
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import passport from "./config/passport";
import cors from "cors";
import router from "./router";
import connectToMongodb from "./config/database";
import log4js from "./config/log4j";

/**
 * App Variables
 */
dotenv.config();
const app = express();

/**
 *  App Configuration
 */
app.use(
  log4js.connectLogger(log4js.getLogger("access"), {
    level: "auto",
    context: true,
    format: `:referrer :remote-addr :method :url => status/:status HTTP/:http-version :user-agent`,
  })
);
app.use(cors({ origin: process.env.APP_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(`/${process.env.APP_API}`, router);
connectToMongodb();

/**
 * Server Activation
 */
const server = app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});

export default server;
