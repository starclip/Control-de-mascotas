var express = require('express');
var router = express.Router();
const Cita = require("../Controladores/CitasController.js");

// Guarde la cita en la base de datos.
router.post('/Crear', Cita.create);

// Modifique la cita que ya estaba creada.
router.post('/Editar', Cita.update);

// Elimina la cita.
router.post('/Eliminar', Cita.delete);

// Obtiene la cita específica de la base de datos.
router.post('/Obtener', Cita.findOne);

// Obtener los datos necesarios para una cita dado una cédula.
router.post('/ObtenerDatosCedula', Cita.findId);

// Obtenga la lista de citas de los usuarios.
router.get('/ObtenerLista', Cita.findAll);

module.exports = router;  