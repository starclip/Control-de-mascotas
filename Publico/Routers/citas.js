var express = require('express');
var router = express.Router();
const Cita = require("../Controladores/CitasController.js");

// app.use('/login', require('./routes/login'));
// app.use('/route2', require('./routes/route2'));
// app.use('/route3', require('./routes/route3'));

router.post('/Guardar', Cita.create);

router.post('/Eliminar', function (req, res) { 
    // Llamo a la base de datos.
});

module.exports = router;  