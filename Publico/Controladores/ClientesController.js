const Cliente = require('../Modelos/Cliente.js');

// Crea un nueva cliente en el registro
exports.create = (req, res) => {

    // Valida si el usuario ingreso parámetros.
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Crea un nuevo cliente
    const nuevoCliente = new Cliente({
        IdCliente: req.body.IdCliente,
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Correo: req.body.Correo,
        Telefono: req.body.Telefono,
        hora: req.body.Hora,
        fecha: req.body.Fecha
    });


    // Guarda la el cliente en la base de datos.
    Cliente.create(nuevoCliente, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
};

// Obtiene la lista de clientes del sistema.
exports.findAll = (req, res) => {
    Cliente.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
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
