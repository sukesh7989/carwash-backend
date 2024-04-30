// mongodb://localhost:27017

const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/carwash").then(() => { console.log("Connected"); }).catch((err) => { console.log(err) })