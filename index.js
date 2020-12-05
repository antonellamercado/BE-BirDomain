//Donde inicia nuestro server
const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
require ("dotenv").config();

const app = express ();

//middlewares

app.use(express.json());
app.use(cors());

//Puertos 
//heroku hay que buscar
//heroku usa un puerto y asigna

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log (`the server has started on port: ${PORT}`));

//mongoose nos conecta a mongoDB

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}, (err)=>{
    if (err) throw err;
    console.log("MongoDB connection established")
});


//set routes

app.use("api/users", require("./routes/userRouter"));


