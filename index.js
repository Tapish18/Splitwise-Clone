require("dotenv").config();
const port = 8000
const express = require("express")
const path = require("path")
const router = require("./routes/index") 
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("./config/mongoose")


const app = express()

app.set("view engine","ejs")
app.set("views" , path.join(__dirname,"views"));
app.use(expressLayouts);
app.use(express.static("statics"));
app.use(express.urlencoded({extended:true})) //body parser

app.use("/",router);

app.listen(port,function(err){
    if(err){
        console.log(`Error Occurred in starting server : ${err}`)
    }else{
        console.log(`Server started successfully at port ${port}`)
    }
})