const mongoose = require("mongoose");

const buysSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    userId: {
        type:String,
        required:true}
});

module.exports = Buys = mongoose.model ("Buys", buysSchema);


