const express = require("express");
const carRouter = express.Router();
const { CarModel } = require("../models/car.model");

// Get all cars
carRouter.get("/", async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific car by ID
carRouter.get("/:id", async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new car
carRouter.post("/", async (req, res) => {
  try {
    const {
    location,
    category,
      carMakeModel,
      vehicleRegNumber,
      carPhoto,
      permitValidity,
      insuranceValidity,
    } = req.body;

    const newCar = new CarModel({
        location,
    category,
      carMakeModel,
      vehicleRegNumber,
      carPhoto,
      permitValidity,
      insuranceValidity,
    });

    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a specific car by ID
carRouter.patch("/:id", async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (car) {
      const {
        location,
        category,
        carMakeModel,
        vehicleRegNumber,
        carPhoto,
        permitValidity,
        insuranceValidity,
      } = req.body;

      if(location){
        car.location=location;
      }
      if(category){
        car.category=category;
      }
      if (carMakeModel) {
        car.carMakeModel = carMakeModel;
      }
      if (vehicleRegNumber) {
        car.vehicleRegNumber = vehicleRegNumber;
      }
      if (carPhoto) {
        car.carPhoto = carPhoto;
      }
      if (permitValidity) {
        car.permitValidity = permitValidity;
      }
      if (insuranceValidity) {
        car.insuranceValidity = insuranceValidity;
      }

      const updatedCar = await car.save();
      res.status(200).json(updatedCar);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a specific car by ID
carRouter.delete("/:id", async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (car) {
        await car.deleteOne();
      res.status(200).json({ message: "Car deleted" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { carRouter };