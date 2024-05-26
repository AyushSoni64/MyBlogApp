import connection from "./config/connection.js";
import { configurations } from "./config/configurations.js";
import { app } from "./app.js";

connection(configurations.mongoUrl)
  .then(() => {
    app.listen(configurations.port || 4000, () => {
      console.log("Server is running on port ", configurations.port);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed!! : ", error);
  });
