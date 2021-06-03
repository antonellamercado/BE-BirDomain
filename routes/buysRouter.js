const router = require ("express").Router();
const auth = require("../middlewares/auth");
const Buys = require("../models/buysModel");

router.post("/", auth, async (req,res) => {
    try{

const { title } = req.body;

//validacion
if (!title)
return res.status(400).json ({msg: "No has ingresado todos los campos necesarios"});

const newBuy = new Buys ({
    title,
    userId: req.user
});
const savedBuy = await newBuy.save();
res.json (savedBuy)
    }catch(err) {
        res.status(500).json({error:err.message});
    }
}
)

router.get("/allbuys" , auth, async (req,res) =>{
    const buys = await Buys.find({userId: req.user});
    res.json(buys);

});

router.delete ("/:id", auth, async (req,res) => {
    //primero verificamos que el usuario quiere eliminar
    const buys = await Buys.findOne ({userId:req.user, _id: req.params.id});

    if(!buys)
    return res.status(400).json ({msg: "No se han encontrado compras para el usuario"});
    const deletedBuy = await Buys.findByIdAndDelete(req.params.id);
    res.json(deletedBuy);
});

module.exports = router;