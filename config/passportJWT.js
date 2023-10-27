const passport = require("passport")
const strategyJWT = require("passport-jwt").Strategy;
// const extractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const options = {}
const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
options.secretOrKey = process.env.JWT_SECRET;
options.jwtFromRequest = cookieExtractor;
options.passReqToCallback = true;


passport.use(new strategyJWT(options,async function(req,jwt_payload,done){
    try{
        console.log(jwt_payload);
        
        // let fetchedUser = await User.findById(jwt_payload._id);
        // if(!fetchedUser){
        //     console.log("No Such User Found");
        //     return done(null,false);
        // }
        if(req.cookies["Userid"] != jwt_payload._id){
            console.log("Incorrect User");
            return done(null,false);
        }
        return done(null,jwt_payload);
    }catch(err){
        console.log("Error Occured : ",err);
        return done(err);
    }
}))


passport.checkAuthentication = function (req,res,next){
    // if user is signed in 
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 

    return res.redirect("/user/sign-in");
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req && req.user){
        console.log("func called")
        res.locals.user = req.user; 
    }
    return next();
}



module.exports = passport;