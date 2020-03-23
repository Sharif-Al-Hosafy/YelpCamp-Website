let mongoose = require("mongoose");
let CAMPGROUND = require("./models/campground");
let Comment = require("./models/comments");

var data = [
    {
        name: "Cloud's Rest",
        url: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa",
        url: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        url: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    CAMPGROUND.remove({}, function (err, add) {
        // if (err) console.log(err);
        // else {
        //     console.log("camps deleted");
        //     data.forEach(function (camp) {
        //         CAMPGROUND.create(camp, function (err, comment) {
        //             if (err) console.log(err);
        //             else {
        //                 console.log("camp added");
        //                 Comment.create({
        //                     author: "Sharif",
        //                     content: "hi there niggas"
        //                 }, function (err, data) {
        //                     if (err) console.log(err);
        //                     else {
        //                         comment.comments.push(data);
        //                         comment.save();
        //                         console.log("Created new comment");
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // }
    })
}

module.exports = seedDB;