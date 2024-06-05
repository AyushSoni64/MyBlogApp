import connection from "./config/connection.js";
import { configurations } from "./config/configurations.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

connection(configurations.mongoUrl)
  .then(() => {
    server.listen(configurations.port || 4000, () => {
      console.log("Server is running on port ", configurations.port);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed!! : ", error);
  });
