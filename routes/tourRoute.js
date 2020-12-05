const express = require ('express');
const tourRouter = express.Router();
//llamar controlador
const toursController = require('../controllers/toursController');
const {checkTour} = require('express-validator');

tourRouter.post('/', 
[   checkTour('title','El campo "titulo" no puede estar vacio').not().isEmpty(),
    checkTour('description','El campo "descripcion" no puede estar vacio').not().isEmpty(),
    checkTour('body','El campo "body" no puede estar vacio').not().isEmpty(),
    checkTour('info','La "informacion adicional" no puede estar vacio').not().isEmpty(),
    checkTour('img','La imagen es obligatorio').not().isEmpty(),
    checkTour('price','El campo "precio" no puede estar vacio').isEmpty(),
    checkTour('dias','El campo "dias" no puede estar vacio').isEmpty(),
    checkTour('ecoregiones','El campo "ecoregiones" no puede estar vacio').isEmpty(),
    checkTour('especies','El campo "especies" es obligatorio').isEmpty(),
],
toursController.createTour);

tourRouter.get('/:id', toursController.findById);
tourRouter.get('/', toursController.findAll);
tourRouter.put('/', toursController.update);

module.exports = tourRouter;