module.exports.homePage = function(req,res){
    return res.render("home.ejs",{
        title : "Splitwise | Home"
    })
}