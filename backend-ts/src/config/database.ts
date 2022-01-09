/**
 * Required External Modules
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import log4js from "log4js";

dotenv.config();
const log = log4js.getLogger();

/**
 * MongoDB Definition
 */
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectToMongodb = async () =>
  await mongoose
    .connect(uri, {})
    .then(() => {
      log.debug(
        "ready to use. The `mongoose.connect()` promise resolves to undefined."
      );
    })
    .catch((err) => {
      log.debug(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`
      );
      process.exit();
    });

export default connectToMongodb;
