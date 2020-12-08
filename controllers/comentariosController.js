const Comentarios = require('../models/Comentarios');

exports.traerTodos = async (req, res) => {
    try {
        const comentarios = await Comentarios.find({});
        res.json(comentarios);
        //res.status(200).json({msg: 'Coment obtenidas correctamente', comentarios});
    } catch (error) {
        console.log(error);
    }
    res.end();
}

exports.crearComentario = async(req, res) => {
    const comment = new Comentarios(req.body);
    try {
        await comment.save();
       res.status(200).json({ message: 'Coment creado correctamente'});
   } catch (error) {
       console.log('error al crear comment ', error);
        res.status(500).send({ msg: 'Ocurrio un error al crear comment' });
    }
    res.end();
}