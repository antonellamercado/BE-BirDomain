const mongoose = require('mongoose');
const toursSchema =mongoose.Schema({
nombre: 
    {
        type: String,
        required: true,
        trim: true,
    },
nombreCientifico: 
{
        type: String,
        required: true,
        trim: true,
},
info: 
{
        type: String,
        required: true,
        trim: true
},
body: 
{
        type: String,
        required: true,
        trim: true
},
img: 
{
        type: String,
        required: true,
        trim: true
}
})
module.exports = mongoose.model('Aves', toursSchema);