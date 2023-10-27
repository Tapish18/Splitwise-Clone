const passport = require("passport");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
module.exports.signUp = function(req,res){
    return res.render("sign-up.ejs",{
        title : "Splitwise | Sign Up"
    });
}

module.exports.signIn = async function(req,res){
    return res.render("sign-in.ejs",{
        title : "Splitwise | Sign In"
    })
}

module.exports.createUser = async function(req,res){
    try{
        console.log(req.body)
        let searchedUser = await User.findOne({email : req.body.email})

        if(!searchedUser){
            let createdUser = await User.create(req.body)
            if(createdUser){
                console.log("User created Successfully : ",createdUser);
                return res.redirect("/");
            }

        }
        console.log("Username with this email already exists");
        return res.redirect("back");
    }catch(err){
        console.log("Error Occurred : ",err);
        return res.redirect("back")
    }
    
}

module.exports.authenticate = async function(req,res){
    try{
        let fetchedUser = await User.findOne({email : req.body.email})
        if(!fetchedUser || fetchedUser.password != req.body.password){
            console.log("Incorrect Username/Password ")
            return res.redirect("back")
        }
        console.log("User Logged In successfully : ",fetchedUser)

        const token = jwt.sign(fetchedUser.toJSON(),process.env.JWT_SECRET,{expiresIn : `${60 * 60 * 1000}`})

        res.cookie("Userid",fetchedUser._id);
        res.cookie("jwt",token,{ secure: false });
        return res.redirect("/user/profile")
    }catch(err){
        console.log("Error Occurred : ",err)
        return res.redirect("/");
    }
}

module.exports.signOut = async function(req,res){
    if(res && res.cookie){
        res.clearCookie("jwt")
        res.clearCookie("Userid")

    }
    return res.redirect("/");
}

module.exports.showProfile = function(req,res){
    res.locals.user = req.user;
    return res.render("profile.ejs",{
        title : "Splitwise | My Profile"
    })
}


