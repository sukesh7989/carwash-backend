const dotenv  = require('dotenv')
const mongoose = require("mongoose");
dotenv.config()

const mongoose = require("mongoose")


mongoose.connect(process.env.URI).then(() => { console.log("Connected"); }).catch((err) => { console.log(err) })