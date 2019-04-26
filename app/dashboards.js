var mongoose = require("mongoose");

// this will be our data base's data structure 
var dashboardSchema = new mongoose.Schema({}, { strict: false });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Dashboards", dashboardSchema);