import mongoose from "mongoose";
import { DB_NAME } from "../libs/constants.js";
import seedData from "../libs/seedData.js";

const connection = async (mongoUrl: string) => {
  try {
    const connInstance = await mongoose.connect(
      `${mongoUrl}/${DB_NAME}`
    );
    if (connInstance) {
      await seedData();
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
