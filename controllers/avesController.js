//contendrá  las funciones que queremos que ejecute el server cuando se visitan las urls.
const Aves = require('../models/AvesModel');
//////////////////////////////////////////////////////////////
// traer todas las aves
exports.traerAves = async (req, res) => {
    try {
        const aves = await Aves.find({});
        res.json(aves);
        //res.status(200).json({msg: 'Aves obtenidas correctamente', aves});
    } catch (error) {
        console.log(error);
    }
}
///////////////////////////////////////////////////////
// traer ave por id
exports.traerAve = async (req, res) => {
    try {
        const ave = await Aves.findById(req.params.id);
        res.json(ave);
    } catch(error) {
        console.log(error);
        
    }
}

/////////////////////////////////////////////////////
// crear ave
    exports.createAve = async(req, res) => {
        const ave = new Aves(req.body);
        try {
            await ave.save();
        res.status(200).json({ message: 'Ave creado correctamente'});
    } catch (error) {
        console.log('error al crear ave', error);
        res.status(500).send({ msg: 'Ocurrio un error al crear ave' });
    }
    res.end();
}