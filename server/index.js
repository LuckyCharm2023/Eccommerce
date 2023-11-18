const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const MongoDB = process.env.MONGO_DB;
const auth = require("./routes/auth");

app.listen("4000", () => {
  console.log("SERVER CONNECTED");
});
mongoose.connect(MongoDB).then(() => {
  console.log("DATABASE CONNECTED");
});
app.use("/auth", auth);
