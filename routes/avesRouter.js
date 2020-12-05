var express = require ('express');
const avesRouter = express.Router();
//llamar controlador
const avesController = require('../controllers/avesController');
avesRouter.get('/', avesController.getAves);