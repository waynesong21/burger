var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/burgers", function(req, res) {
    burger.all(function(data) {
        var burgersArray = [];
        for(var i = 0; i < data.length; i++) {
            console.log(data[i]);
            burgersArray.push(data[i]);
        }
        // console.log(data);
        var hbsObject = {
            burgers: burgersArray
        };
        console.log(burgersArray);
        res.render("index", hbsObject);
    });
});


router.post("/api/burgers", function(req, res) {
    burger.create(["name", "devoured"], [req.body.name, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;