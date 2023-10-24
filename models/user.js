const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption");
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
    
},{
    timestamps : true
})

userSchema.plugin(encrypt, {secret:process.env.SECRET , encryptedFields : ["password"]})
const User = mongoose.model("User",userSchema)

module.exports = User;