const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
const crypto = require("crypto");



passport.use(new googleStrategy({
    clientID : process.env.CLIENTID,
    clientSecret : process.env.CLIENTSECRET,
    callbackURL : "http://localhost:8000/user/auth/google/callback"
},async function(accessToken , refreshToken , profile, done){
    try {
        const fetchedUser = await User.findOne({email : profile.emails[0].value})
        if(fetchedUser){
            return done(null,fetchedUser)
        }

        const createdUser = await User.create({
            username : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString("hex"),
            avatar : profile.photos[0].value
        })

        console.log("user Created Successfully");
        return done(null,createdUser)

    } catch (error) {
        console.log("Error Occurred : ",error);
        return done(error)
    }
    
}))



module.exports = passport;