var express = require('express');
var router = express.Router();
const Cita = require("../Controladores/CitasController.js");

// Guarde la cita en la base de datos.
router.post('/Guardar', Cita.create);

router.post('/Eliminar', function (req, res) { 
    // Llamo a la base de datos.
});

// Obtiene la cita específica de la base de datos.
router.post('/Obtener', Cita.findOne);

// Obtenga la lista de citas de los usuarios.
router.get('/ObtenerLista', Cita.findAll);

module.exports = router;  