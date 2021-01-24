var express = require('express');
var router = express.Router();
const Login = require("../Controladores/LoginController.js");

// Guarde la cita en la base de datos.
router.post('/IniciarSesion', Login.iniciarSesion);

// Cierra la sesión actual del sistema.
router.post('/CerrarSesion', Login.cerrarSesion);

// Compruebe si se inicia la sesión.
router.get('/ObtenerSesion', Login.obtenerSesion);

module.exports = router;  