var express = require ('express');
const avesRouter = express.Router();
const avesController = require('../controllers/avesController');
avesRouter.get('/', avesController.traerAves);
// avesRouter.post('/', avesController.createAve);
module.exports = avesRouter;