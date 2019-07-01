var mongoose = require("mongoose");

// this will be our data base's data structure 
var layoutSchema = new mongoose.Schema({}, { strict: false });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Merchants", layoutSchema);