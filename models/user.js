const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption");
const multer = require("multer")
const path = require("path");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required :  true
    },
    email : {
        type : String,
        unique : true,
        required  :true
    },

    password  :{
        type : String,
        required  :true
    },
    avatar : {
        type : String,

    }
    
},{
    timestamps : true
})


userSchema.statics.AVATAR_PATH = "/uploads/users/avatars"
userSchema.plugin(encrypt, {secret:process.env.SECRET , encryptedFields : ["password"]})



// userSchema.statics.uploadAvatar = multer({storage : storage}).single("avatar");


const User = mongoose.model("User",userSchema)

module.exports = User;