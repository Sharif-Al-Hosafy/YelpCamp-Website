let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    CAMPGROUND = require("./models/campground"),
    Comment = require("./models/comments"),
    seedDB = require("./seed"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/users");

var campsRoutes = require("./routes/campsRoutes"),
    commentRoutes = require("./routes/commentRoutes"),
    authRoutes = require("./routes/authRoutes");

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method")); //put request
app.use(flash());
//seedDB();

//==== passport Config ===== ///
app.use(require("express-session")({
    secret: "yelp camp",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//=============================================//

app.use(function (req, res, next) {
    res.locals.currentUser = req.user; //pass the user to every single template
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(authRoutes);
app.use("/campgrounds", campsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3001, function () {
    console.log("Listening !!!");
});
