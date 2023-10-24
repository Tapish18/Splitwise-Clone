const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/splitwise")

const db = mongoose.connection;


db.on("error",console.error.bind(console,"Error Occurred in connecting to MongoDB"));

db.once("open",function(){
    console.log("Successfully connected to mongoDB")
})