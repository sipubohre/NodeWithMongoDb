var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Layouts = require('./layouts')

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useMongoClient: true
};

// const mongoURI = process.env.MONGODB_URI;
mongoose.connect("mongodb://localhost:27017/LayoutStudio", option).then(function(){
    console.log("connected")
}, function(err) {
    //err handle
    console.log('//err handle: ', err);
});

app.get("/layout", (req, res) => {
    Layouts.find()
        .then(item => {
            console.log('item: ', item);
            res.json({
                message: "Hurray!!, Request saved succesfully.",
                data: item
            });
        })
        .catch(err => {
            res.status(400).send({
                message: "Unable to fetch from database",
                error: err
            });
        });
    //      => {
    //     console.log('data: ', data);
    //     console.log('err: ', err);
    //     if (err) {
    //         console.log('err: ', err);
    //         res.send({ success: false, error: err });
    //     } else {
    //         console.log("this is response section");
    //         res.send({ success: true, data: data });
    //     }
    // });
});

app.post("/layout", (req, res) => {
    var myData = new Layouts(req.body);
    myData.save()
        .then(item => {
            res.send("Hurray!!, Layout saved succesfully.");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});