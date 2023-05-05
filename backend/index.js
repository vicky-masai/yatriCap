const express = require("express");
const { connection } = require("./db");
const {carRouter } = require("./routes/car.route")
const {driverRouter } = require("./routes/driver.route")
require("dotenv").config();


const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/cars", carRouter);

app.use("/drivers", driverRouter);
let Port = process.env.PORT;
app.listen(Port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Connection Error:", err);
  }
  console.log("Server running on port ",Port);
});