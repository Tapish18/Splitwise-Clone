const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/sign-up",userController.signUp);
router.get("/sign-in",userController.signIn);
router.post("/create-user", userController.createUser)
router.post("/authenticate",userController.authenticate)


module.exports = router;