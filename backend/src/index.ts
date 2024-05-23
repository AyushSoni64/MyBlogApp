import { config } from "dotenv";
import connection from "./config/connection.js";
import express from "express";
import { configuration } from "./config/configuration.js";

// const express = require("express");
config();

const app = express();

connection()
  .then(() => {
    app.listen(configuration.port || 4000, () => {
      console.log("Server is running on port ", configuration.port);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed!! : ", error);
  });
