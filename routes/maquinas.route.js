const express = require('express');
const router = express.Router();

const maquinasController = require('../controllers/maquinas.controller');

router.get('/testar', maquinasController.test);
module.exports = router;