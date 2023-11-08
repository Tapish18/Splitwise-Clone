const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const passport = require("passport")
const upload = require("../config/multer").upload

router.get("/sign-up",userController.signUp);
// router.get("/sign-in",userController.signIn);
router.get("/sign-out",userController.signOut)
router.post("/create-user", upload.single("avatar"),userController.createUser)
router.post("/authenticate",userController.authenticate)
router.get("/profile",passport.authenticate("jwt",{session : false , failureRedirect : "/"}),userController.showProfile)
router.get("/auth/google", passport.authenticate("google",{scope : ["profile","email"]}));
router.get("/auth/google/callback",passport.authenticate("google",{session : false,failureRedirect : "/"}), userController.showProfile);


module.exports = router;