const mongoose = require('mongoose');
const toursSchema =mongoose.Schema({
title: 
{
    type: String,
    required: true,
    trim: true,
    unique: true
},
body:
{
    type:String,
    required: true,
    trim: true
},
description:
{
    type: String,
    required: true,
    trim: true
},
info:
{
    type: String,
    required: true,
    trim: true
},
img: {
    type: String,
    required: true,
    trim: true
},
imgD:{
    type: String,
    required: true,
    trim: true
},
price:{
    type: Number,
    required: true,
    trim: true
},
lat:{
    type: Array,
    required: true,
    default:[]
},

latObs:{
    type: Array,
    required: true,
    default:[]
},
dias:{
    type: Number,
    required: true,
    trim: true
},
ecoregiones:{
    type: String,
    required: true,
    trim: true
},
especies:{
    type: Number,
    required: true,
    trim: true
},
isDestacado:{
    type:Boolean,
    required: true,
    trim:true
},
})
module.exports = mongoose.model('Tours', toursSchema);