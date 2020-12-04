const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{ 
        type: String, 
        required:true, 
        trim:true,
        unique:true},

    password:{
        type:String, 
        required:true, 
        minlength:8,
        trim:true},

    displayName:{
        type:String, 
        required:false, 
        trim:true},

    img:{
        type:String,
        required:false,
    },

    favs:{
        type:Array,
        default:[]
    },

    buys:{
        type:Array,
        default:[],
    }
})

module.exports = User = mongoose.model("User", userSchema)

//model("nombre de la conection")