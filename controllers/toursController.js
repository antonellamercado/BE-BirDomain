const Tours = require('../models/Tours');
const {check} = require ('express-validator');
///////////////////////////////////////////////////////
//crear tour
exports.createTour = async(req,res) => {

    //valida que el request no tenga errores
    const errors = check(req)
    if (!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array});
    }
    // hago destructuring de lo que trae el req
    const {title, body, description, info, img, imgD, price, lat, latObs, dias, ecoregiones, especies, destacado } = req.body;

    try
    {
    // crea nuevo tour en el  modelo Tours
    let tour = new Tours(req.body);
    // guarda nuevo tour a la BD
    await tour.save();
    }
    catch(error){
        console.log('error al crear usuario', error);
        res.status(400).json({msg: 'Lo siento, ocurrio un error'});
    }
    res.status(200).json({msg: 'Tour creado correctamente'});
    res.end();
}
////////////////////////////////////////////////////////
//editar tour
exports.update = async(req,res) => {
//crea obj
const tour = new Tours ({
    title: req.body.title,
    description: req.body.description,
    info:req.body.info,
    body: req.body.info,
    img: req.body.img,
    imgD:req.body.imgD,
    price: req.body.price,
    dias: req.body.dias,
    ecoregiones:req.body.ecoregiones,
    especies: req.body.especies,
    isDestacado: req.body.isDestacado
})
//busca para modificar el tour
await Tours.findByIdAndUpdate({_id: req.body.id},{
    $set: {
        title: tour.title, 
        description: tour.description,
        info: tour.info,
        body: tour.body,
        img: tour.img,
        imgD: tour.imgD,
        price: tour.price,
        dias: tour.dias,
        ecoregiones: tour.ecoregiones,
        especies: tour.especies,
        isDestacado: tour.isDestacado
    }
})
.catch((error) => {
    console.log('error al editar tour', error)
    res.status(400).json({msg: 'Ocurrio un error al editar tour'});
})

console.log('modificacion exitosa');
res.status(200).json({msg: 'Tour editado correctamente'});
res.end();
}

///////////////////////////////////////////////////7
//eliminar tour
exports.delete = async(req,res) => {
    await Tours.deleteOne({_id: req.params.id})
    .then((data) => {
        console.log('tour eliminado', data);
        res.status(200).json({msg: 'Tour eliminado correctamente'});
        res.end()
    })
    .catch ((error) => {
        return res.status(400).json({msg: 'Ocurrio un error al eliminar un tour'});

    });
}

/////////////////////////////////////////////////////