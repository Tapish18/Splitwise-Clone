const multer = require("multer");
const path = require("path")

const AVATAR_PATH = "/uploads/users/avatars"
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null , path.join(__dirname,"..",AVATAR_PATH))
    },
    filename : function(req,file,cb){
        const uniqueprefix = Date.now() + "-";
        return cb(null,uniqueprefix + file.originalname);
    }
})


const upload = multer({storage : storage})


module.exports = {upload ,AVATAR_PATH }