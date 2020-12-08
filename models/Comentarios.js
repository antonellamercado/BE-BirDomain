const mongoose = require('mongoose');
const comentariosSchema =mongoose.Schema({
nombre: 
{
    type: String,
    required: true,
    trim: true,
},
body:
{
    type: String,
    required: true,
    trim: true
},
email:
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
module.exports = mongoose.model('Comentarios', comentariosSchema);