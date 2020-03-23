var CAMPGROUND = CAMPGROUND = require("../models/campground"),
    Comment = require("../models/comments"),
    middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) { //authintication
        CAMPGROUND.findById(req.params.id, function (err, found) {
            if (err)
                res.redirect("back")
            else {
                if (found.author.id.equals(req.user.id)) { //authorization
                    next();
                } else {
                    req.flash("error", "You don't have permession");
                    res.redirect("back")
                }
            }
        })
    }
    else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}


middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) { //authintication
        Comment.findById(req.params.comment_id, function (err, found) {
            if (err)
                res.redirect("back")
            else {
                if (found.author.id.equals(req.user.id)) { //authorization
                    next();
                } else {
                    req.flash("error", "You don't have permession");
                    res.redirect("back")
                }
            }
        })
    }
    else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;