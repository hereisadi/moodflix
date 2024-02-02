require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const connectToDB = require("./db/ConnectToDb");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

connectToDB();

app.use("/", userRoutes);

module.exports = app;
