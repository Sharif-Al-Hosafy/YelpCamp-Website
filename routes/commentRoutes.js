var express = require("express"),
    router = express.Router({ mergeParams: true }),
    CAMPGROUND = require("../models/campground"),
    Comment = require("../models/comments"),
    middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function (req, res) {
    CAMPGROUND.findById(req.params.id, function (err, camp) {
        if (err) console.log(err);
        else {
            res.render("comments/new", { camp: camp });
        }
    })
})

router.post("/", middleware.isLoggedIn, function (req, res) {
    CAMPGROUND.findById(req.params.id, function (err, campground) {
        if (err) console.log(err);
        else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) console.log(err);
                else {
                    comment.author.id = req.user._id;//what if a user changed his user name, So that's why it's important
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

//Edit Comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err)
            res.render("back")
        else
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment })
    })
})

router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, success) {
        if (err)
            res.redirect("back");
        else
            res.redirect("/campgrounds/" + req.params.id);
    })
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, deleted) {
        if (err)
            res.redirect("back")
        else
            res.redirect("back")
    })
})

module.exports = router;