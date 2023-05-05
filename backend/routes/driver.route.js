const express = require("express");
const driverRouter = express.Router();
const { DriverModel } = require("../models/driver.model");

// Get all drivers
driverRouter.get("/", async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific driver by ID
driverRouter.get("/:id", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id);
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new driver
driverRouter.post("/", async (req, res) => {
  try {
    const {
        location,
      driverName,
      mobileNumber,
      licenceNumber,
      aadharNumber,
      driverPhoto,
    } = req.body;

    const newDriver = new DriverModel({
        location,
      driverName,
      mobileNumber,
      licenceNumber,
      aadharNumber,
      driverPhoto,
    });

    const savedDriver = await newDriver.save();

    res.status(201).json(savedDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing driver by ID
driverRouter.patch("/:id", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id);
    if (driver) {
      const {
        location,
        driverName,
        mobileNumber,
        licenceNumber,
        aadharNumber,
        driverPhoto,
      } = req.body;
      if (location) driver.location = location;
      if (driverName) driver.driverName = driverName;
      if (mobileNumber) driver.mobileNumber = mobileNumber;
      if (licenceNumber) driver.licenceNumber = licenceNumber;
      if (aadharNumber) driver.aadharNumber = aadharNumber;
      if (driverPhoto) driver.driverPhoto = driverPhoto;

      const updatedDriver = await driver.save();

      res.status(200).json(updatedDriver);
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a driver by ID
driverRouter.delete("/:id", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id);
    if (driver) {
      await driver.deleteOne();
      res.status(200).json({ message: "Driver deleted" });
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { driverRouter };
