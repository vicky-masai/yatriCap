const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema(
  
  {
    location: {
        type:String,
        enum:["Lucknow", "Kanpur", "Allahabad","Varanasi","Gorakhpur","Mumbai","Pune","Kalyan","Bangalore"],
        default:'Lucknow',
    },
    driverName: String,
    mobileNumber: String,
    licenceNumber: String,
    aadharNumber: String,
    driverPhoto: String,
  },
  {
    versionKey: false,
  }
);

const DriverModel = mongoose.model("Drivers", DriverSchema);

module.exports = {
  DriverModel,
};