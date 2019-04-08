var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Layouts = require('./layouts')

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useMongoClient: true
};

mongoose.connect("mongodb://localhost:27017/LayoutStudio", option).then(function () {
    console.log("connected")
}, function (err) {
    //err handle
    console.log('//err handle: ', err);
    });

app.use('*', (req, res, next) => { 
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// Get all layouts
app.get("/layout", (req, res) => {
    Layouts.find()
        .then(item => {
            const response = {
                "message": "Hurray!!, Request processed succesfully.",
                "data": item
            }
            res.json(response);
        })
        .catch(err => {
            res.status(400).json({
                message: "Unable to fetch from database",
                error: err
            });
        });
});

// get layout by its id
app.get("/layout/:layoutId", (req, res) => {
    Layouts.findById(req.params.layoutId)
        .then(layout => {
            if (!layout) {
                return res.status(404).json({
                    message: "Layout not found with id " + req.params.layoutId
                });
            }
            res.json(layout);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Layout not found with id " + req.params.layoutId
                });
            }
            return res.status(500).json({
                message: "Error retrieving layout with id " + req.params.layoutId
            });
        });
});

// update layout by its id
app.put("/layout/:layoutId", (req, res) => {
    Layouts.findByIdAndUpdate(req.params.layoutId, req.body)
        .then(layout => {
            if (!layout) {
                return res.status(404).json({
                    message: "Layout not found with id " + req.params.layoutId
                });
            }
            res.json(layout);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Layout not found with id " + req.params.layoutId
                });
            }
            return res.status(500).json({
                message: "Error updating layout with id " + req.params.layoutId
            });
        });
});

// delete layout by its id
app.delete("/layout/:layoutId", (req, res) => {
    Layouts.findByIdAndRemove(req.params.layoutId)
        .then(layout => {
            if (!layout) {
                return res.status(404).json({
                    message: "Layout not found with id " + req.params.layoutId
                });
            }
            res.json({ message: "Layout deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Layout not found with id " + req.params.layoutId
                });
            }
            return res.status(500).json({
                message: "Error updating layout with id " + req.params.layoutId
            });
        });
});

//save layout
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