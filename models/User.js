//Models are the superpower of Mongoose. They help you enforce "schema" rules and provide a seamless 
//integration of your Node code into database calls.
const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true
},
password: {
    type: String,
    required: true,
    trim: true
},
email: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
registerDate: {
    type: Date,
    default: Date.now()
},
favoritos:{
    type: Array,
    required: false,
},
shopCart:{
    type:Array,
    required:false,
}

})

module.exports = mongoose.model('Users', usersSchema);