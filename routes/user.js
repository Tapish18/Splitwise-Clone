const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const passport = require("passport")

router.get("/sign-up",userController.signUp);
// router.get("/sign-in",userController.signIn);
router.get("/sign-out",userController.signOut)
router.post("/create-user", userController.createUser)
router.post("/authenticate",userController.authenticate)
router.get("/profile",passport.authenticate("jwt",{session : false , failureRedirect : "/"}),userController.showProfile)


module.exports = router;