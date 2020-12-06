//contendrá  las funciones que queremos que ejecute el server cuando se visitan las urls.
const Aves = require('../models/Aves');

// traer todos las aves

const traerAves = async (req, res, next) => {
    try {
        const aves = await Aves.find({});
        res.status(200).json({msg: 'Aves obtenidos correctamente', aves});
    } catch (error) {
        console.log('error al traer todos las aves', error);
        res.status(500).send({msg:'Ocurrio un error al traer todos las aves'});
        next();
    }
    res.end();
}
exports.traerAves = traerAves