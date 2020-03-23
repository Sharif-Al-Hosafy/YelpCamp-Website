var express = require("express"),
    router = express.Router(),
    CAMPGROUND = require("../models/campground"),
    middleware = require("../middleware");

//INDEX
router.get("/", function (req, res) {
    CAMPGROUND.find({}, function (err, camps) {
        if (err) console.log(err)
        else
            res.render("campground/index", { camps: camps });
    })
});

//NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campground/New");
});

//CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.description;
    var author = {
        username: req.user.username,
        id: req.user._id
    }
    var newCamp = { name: name, description: description, url: url, author: author }
    CAMPGROUND.create(newCamp, function (err, camp) {
        if (err)
            console.log(err);
        else {
            console.log(camp);
            res.redirect("/campgrounds");
        }
    });
});

//SHOW
router.get("/:id", function (req, res) {
    CAMPGROUND.findById(req.params.id).populate("comments").exec(function (err, camps) {
        if (err) console.log(err);
        else
            console.log(camps)
        res.render("campground/show", { camp: camps });
    })
})

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    CAMPGROUND.findById(req.params.id, function (err, found) {
        res.render("campground/edit", { camp: found })
    })
})

// //update
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    CAMPGROUND.findByIdAndUpdate(req.params.id, req.body.camp, function (err, updated) {
        if (err)
            res.redirect("/campgrounds")
        else
            res.redirect("/campgrounds/" + req.params.id)
    })
})

//remove
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    CAMPGROUND.findByIdAndRemove(req.params.id, function (err, deletedCamp) {
        if (err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds");
    })
})

module.exports = router;