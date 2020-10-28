var express = require('express');
var router = express.Router();

// app.use('/login', require('./routes/login'));
// app.use('/route2', require('./routes/route2'));
// app.use('/route3', require('./routes/route3'));

router.post('/Guardar', function (req, res) { 
    console.log('Route Test1:', req.body);
    res.send({message:'I got the email!'});
    // Llamo a la base de datos.
});

router.post('/Eliminar', function (req, res) { 
    // Llamo a la base de datos.
});

module.exports = router;  