var express = require('express');
var router = express.Router();
const Clientes = require("../Controladores/ClientesController.js");

// Guarda el registro del cliente en la base de datos.
router.post('/Guardar', Clientes.create);

router.post('/Eliminar', function (req, res) { 
    // Llamo a la base de datos.
});

// Obtenga la lista de clientes registrados
router.get('/ObtenerLista', Clientes.findAll);

module.exports = router;  