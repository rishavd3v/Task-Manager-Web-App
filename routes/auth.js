var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel = require("./users");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.post("/signupAuth", async function(req, res) {
    var userData = new userModel({
        username: req.body.username,
        email: req.body.email
    });
    var existingUser = await userModel.findOne({ $or: [{ username: userData.username }, { email: userData.email }] });

    if (existingUser) {
        res.redirect("/loginPage?message=Username or email already exists");
    } else {
        // If no existing user is found, register the new user
        await userModel.register(userData, req.body.password);
        passport.authenticate("local")(req, res, function() {
            res.redirect("/task");  
        });
    }
});

router.post("/loginAuth",passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/loginPage?message=Wrong username or password"
}),function(req,res){ });

router.get('/logout', function(req, res, next) {
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/");
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/loginPage");
}


module.exports = {
    router,
    isLoggedIn
};