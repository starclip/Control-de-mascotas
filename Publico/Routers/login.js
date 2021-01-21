var express = require('express');
var router = express.Router();
const Login = require("../Controladores/LoginController.js");

// Guarde la cita en la base de datos.
router.post('/IniciarSesion', Login.iniciarSesion);

// Cierra la sesión actual del sistema.
router.post('/CerrarSesion', Login.cerrarSesion);

module.exports = router;  