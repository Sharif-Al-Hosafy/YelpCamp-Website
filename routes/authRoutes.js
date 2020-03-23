var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/users");

router.get("/", function (req, res) {
    res.render("home");
});

router.get("/register", function (req, res) {
    res.render("register")
})

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function () { // take req.body.pass and req.body.username and check and store
                req.flash("success", "Welcome To Yelpcamp " + req.body.username);
                res.redirect("/campgrounds")
            })
        }
    })
})

router.get("/login", function (req, res) {
    res.render("login")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: 'Incorrect Username or Password'
}
), function (req, res) {
});



router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds")
})

module.exports = router;