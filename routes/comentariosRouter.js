const express = require ('express');
const comentariosRouter = express.Router();
const comentariosController = require('../controllers/comentariosController');

comentariosRouter.get('/', comentariosController.traerTodos);
comentariosRouter.post('/', comentariosController.crearComentario);

module.exports = comentariosRouter;