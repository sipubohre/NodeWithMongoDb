var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Layouts = require('./layouts')
const Dashboards = require('./dashboards')

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
// All Layout Crud Operation

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
            const response = {
                "message": "Layout deleted successfully!"
            }
            res.json(response);
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

// layout crud opeartion end

// All Dashboard Crud Operation

// Get all dashboards
app.get("/dashboard", (req, res) => {
    Dashboards.find()
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


// get dashboard by its id
app.get("/dashboard/:dashboardId", (req, res) => {
    Dashboards.findById(req.params.dashboardId)
        .then(dashboard => {
            if (!dashboard) {
                return res.status(404).json({
                    message: "Dashboard not found with id " + req.params.dashboardId
                });
            }
            res.json(dashboard);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Dashboard not found with id " + req.params.dashboardId
                });
            }
            return res.status(500).json({
                message: "Error retrieving dashboard with id " + req.params.dashboardId
            });
        });
});


// update Dashboard by its id
app.put("/dashboard/:dashboardId", (req, res) => {
    Dashboards.findByIdAndUpdate(req.params.dashboardId, req.body)
        .then(dashboard => {
            if (!dashboard) {
                return res.status(404).json({
                    message: "Dashboard not found with id " + req.params.dashboardId
                });
            }
            res.json(dashboard);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Dashboard not found with id " + req.params.dashboardId
                });
            }
            return res.status(500).json({
                message: "Error updating dashboard with id " + req.params.dashboardId
            });
        });
});

//save Dashboard
app.post("/dashboard", (req, res) => {
    var myData = new Dashboards(req.body);
    myData.save()
        .then(item => {
            res.send("Hurray!!, Dashboard saved succesfully.");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

// dashboard crud opration end

app.listen(port, () => {
    console.log("Server listening on port " + port);
});