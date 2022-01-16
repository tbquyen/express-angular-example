/**
 * Required External Modules
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import log4js from "log4js";

dotenv.config();
const log = log4js.getLogger("mongoose");

/**
 * MongoDB Definition
 */
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.set("debug", (collectionName, method, query, options) => {
    log.debug(`${collectionName}.${method}`, JSON.stringify(query), options);
});

const connectToMongodb = async () =>
  await mongoose
    .connect(uri, {})
    .then(() => {
      log.debug(`Connected to ${uri}`);
    })
    .catch((err) => {
      log.debug(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`
      );
      process.exit();
    });

export default connectToMongodb;
