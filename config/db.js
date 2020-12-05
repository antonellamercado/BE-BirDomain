//Conecta mongo DB con mongoose utilizando el nuevo URL parser desde mongoose

const mongoose = require('mongoose');
//para acceder a var de entorno
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
  //DB_URL donde esta esa variable??
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: false
    })
    console.log('DB conectada');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;