//Donde inicia nuestro server
const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
require ("dotenv").config();
const app = express ();
const patch = require('path')

//middlewares
app.use(express.urlencoded({extended:false}));
//lee arch json
app.use(express.json());
// habilita request desde cualq url
app.use(cors());
// 4RiXv3z23d9FSuA6

const db = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://dev:4RiXv3z23d9FSuA6@cluster.z4bl6.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(db, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}, (err)=>{
    if (err) throw err;
    console.log("MongoDB connection established")
});



//mongoose nos conecta a mongoDB
/*mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}, (err)=>{
    if (err) throw err;
    console.log("MongoDB connection established")
});*/



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log (`the server has started on port: ${PORT}`));
//const host = process.env.HOST || '0.0.0.0'; 




//set routes
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/tours", require("./routes/tourRouter"));
app.use("/api/aves", require("./routes/avesRouter"));
app.use("/api/comentarios", require("./routes/comentariosRouter"));
app.use(require("./routes/sendEmail"));
