const express = require ('express');
const tourRouter = express.Router();
const toursController = require('../controllers/toursController');
const { check } = require('express-validator');

tourRouter.post('/', 
[   
    check('title','El campo "titulo" no puede estar vacio').not().isEmpty(),
    check('description','El campo "descripcion" no puede estar vacio').not().isEmpty(),
    check('body','El campo "body" no puede estar vacio').not().isEmpty(),
    check('info','La "informacion adicional" no puede estar vacio').not().isEmpty(),
    check('img','La imagen es obligatorio').not().isEmpty(),
    check('price','El campo "precio" no puede estar vacio').not().isEmpty(),
    check('dias','El campo "dias" no puede estar vacio').not().isEmpty(),
    check('ecoregiones','El campo "ecoregiones" no puede estar vacio').not().isEmpty(),
    check('especies','El campo "especies" es obligatorio').not().isEmpty(),
],
toursController.createTour);

// nose si lo mejor es poner: tours/:id
tourRouter.get('/', toursController.findAll);
tourRouter.get('/:id', toursController.findById);
tourRouter.put('/:id', toursController.updateTour);
tourRouter.patch('/:id', toursController.updateTour);
tourRouter.delete('/:id',toursController.deleteTour);
tourRouter.patch('/:id', toursController.updateTour);

module.exports = tourRouter;