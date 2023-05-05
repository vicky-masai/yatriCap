const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
  {
    location: {
        type:String,
        enum:["Lucknow", "Kanpur", "Allahabad","Varanasi","Gorakhpur","Mumbai","Pune","Kalyan","Bangalore"],
        default:'Lucknow',
    },
    category:{
        type:String,
        enum:["Sedan","Mini Suv 4 Seater","Mini Suv 7 Seater","SUV","Premium Sedan","Premium SUV","Tampo Traveller 13 Seater","Tampo Traveller 17 Seater"],
        default:"Sedan",
    }, 
    carMakeModel: String,
    vehicleRegNumber: String,
    carPhoto: String,
    permitValidity: String,
    insuranceValidity: String,
  },
  {
    versionKey: false,
  }
);

const CarModel = mongoose.model("Cars", CarSchema);

module.exports = {
  CarModel,
}; 
