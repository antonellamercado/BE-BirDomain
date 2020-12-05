const Tours = require('../models/Tours');
const {check} = require ('express-validator');
///////////////////////////////////////////////////////
//crear tour
exports.createTour = async(req, res, next) => {
    //valida que el request no tenga errores
    const errors = check(req)
    if (!errors.isEmpty()){
        return  res.status(400).json({errors: errors.array});
    }
    // hago destructuring de lo que trae el req
    const {title, body, description, info, img, imgD, price, lat, latObs, dias, ecoregiones, especies, destacado } = req.body;
    let tour = new Tours(req.body);
    try{
        await tour.save()
        res.status(200).json({msg: 'Tour creado correctamente'});
    }
    catch(error) {
        console.log('error al crear tour', err);
            res.status(500).send({ msg: 'Ocurrio un error al crear tour'});
            next();
        }
    res.end();
}
////////////////////////////////////////////////////////
//editar tour
/*exports.update = async(req,res) => {
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
}*/

///////////////////////////////////////////////////7
//eliminar tour

exports.delete = async(req,res) => {
    try {
        await Tours.findOneAndDelete ({_ir: req.params.id});
        res.status(200).json({msg: 'Tour eliminado correctamente'});    
    } catch (error) {
        console.log('ocurrio un error al eliminar tour',  error);
        res.status(400).json({msg: 'Ocurrio un error al eliminar tour'});
    }
    res.end();
}

/////////////////////////////////////////////////////

// traer todos los tour
const traerTours = async (req, res, next) => {
    try {
        const tours = await Tours.find({});
        res.json(tours);
        res.status(200).json({msg: 'Tours obtenidos correctamente'});
    } catch (error) {
        console.log('error al traer todos los tours', error);
        res.status(500).send({msg:'Ocurrio un error al traer todos los tours'});
        next();
    }
    res.end();
}
exports.findAll = traerTours

///////////////////////////////////////////////////////

// traer tour por ID

const findById = async function (req, res, next) {

    try {
        const tour = await Tours.findById(req.params.id);
        res.json(tour)
        res.status(200).json({msg: 'Tours encontrado por id correctamente'});
    } catch (error) {
        console.log('ocurrio un error al obtener tour por id',error);
        res.status(500).send({msg:'Ocurrio un error al traer tour por id'});
        next();
    }
    res.end();
}

exports.findById = findById

///////////////////////////////////////////////////////7