import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";
import { configuration } from "./configuration.js";

const connection = async () => {
  try {
    const connInstance = await mongoose.connect(
      `${configuration.mongoUrl}/${DB_NAME}`
    );
    if (connInstance) {
      console.log(
        `MongoDb Connected Successfully!!! DB HOST: ${connInstance.connection.host}`
      );
    }
  } catch (error) {
    console.log("Mongo DB Connection: ", error);
    process.exit(1);
  }
};

export default connection;
