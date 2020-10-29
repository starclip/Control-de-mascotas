const Cita = require('../Modelos/Cita.js');

exports.create = (req, res) => {
    // Se llama el método del modelo.
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Crea la nueva cita.
    const nuevaCita = new Cita({
        nombreMascota: req.body.NombreMascota,
        cedula: req.body.Cedula,
        propietario: req.body.Propietario,
        apellido: req.body.Apellido,
        hora: req.body.Hora,
        fecha: req.body.Fecha
    });


    // Guarda la cita en la base de datos.
    Cita.create(nuevaCita, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    
};

exports.findOne = (req, res) => {

};

exports.delete = (req, res) => {

};