module.exports.homePage = function(req,res){
    console.log("Called from Home")
    // console.log(req.user);
    res.locals.user = req.user
    return res.render("home.ejs",{
        title : "Splitwise | Home"
    })
}