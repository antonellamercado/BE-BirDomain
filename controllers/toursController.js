const Tours = require('../models/Tours');
const { validationResult } = require('express-validator');
///////////////////////////////////////////////////////
//crear tour
exports.createTour = async(req, res, next) => {
    //valida que el request no tenga errores
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    //const {title, body, description, info, img, imgD, price, lat, latObs, dias, ecoregiones, especies, destacado } = req.body;
    const tour = new Tours(req.body);
    try {
        const nuevo =await tour.save();
        res.json(tour);
        //res.status(200).json({ message: 'Tour creado correctamente'});
    } catch (error) {
        console.log('error al crear tour', error);
        res.status(500).send({ msg: 'Ocurrio un error al crear tour' });
    }
    res.end();
}
////////////////////////////////////////////////////////
// editar tour 
exports.updateTour = async(req, res) => {
    const { params: { id }, body } = req;
    try {
        // let updateTour = await Tours.findById({ _id: id });
        // if (!updateTour) {
        //     return res.status(404).json({ msg: 'No existe el tour' });
        // }
        updateTour = await Tours.findOneAndUpdate({ _id: id }, body, { new: true });
        console.log(updateTour);
        //res.status(200).json({ msg: 'Tour actualizado', updateTour});
        res.json(updateTour);
    } catch (error) {
        console.log('error al crear tour', error);
        res.status(500).send({ msg: 'Ocurrio un error al editar tour' });
    }
}
///////////////////////////////////////////////////7
//eliminar tour

exports.deleteTour = async(req,res) => {
    try {
        const deleteTour = await Tours.findOneAndDelete ({_ir: req.params.id});
        res.json(deleteTour);
        //res.status(200).json({msg: 'Tour eliminado correctamente'});    
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
       // res.status(200).json({msg: 'Tours obtenidos correctamente'});
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

    const findById = async (req, res, next) => {
        try {
            const tour = await Tours.findById(req.params.id);
            res.json(tour);
            //res.status(200).json({ msg: 'Tours encontrado por id correctamente', tour });
        } catch (error) {
            console.log('error al obtener tour por id', error);
            res.status(500).send('Hubo un error al obtener tour por id');
            next();
        }
        res.end();
    }
    
exports.findById = findById

///////////////////////////////////////////////////////7