const User = require("../models/user")

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
        return res.redirect("/")
    }catch(err){
        console.log("Error Occurred : ",err)
        return res.redirect("back");
    }
}