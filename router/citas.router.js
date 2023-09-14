const { Router } = require('express'); //importacion para crear las rutas
//importacion de los controladores para isarlos en las rutas
const {
    getUsuarios,
    getData
 
} = require('../controllers/citas.controllers');
const router = Router();

//Se aplica una ruta a cada uno con su respectiva funcion del controlador
router.get('/usuarios', getUsuarios);
router.get('/fechas',getData)

module.exports = router;