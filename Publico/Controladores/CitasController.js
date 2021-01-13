const Cita = require('../Modelos/Cita.js');

// Crea una nueva cita para el usuario.
exports.create = (req, res) => {

    // Valida si el usuario ingreso parámetros.
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Crea la nueva cita.
    const nuevaCita = new Cita({
        IdCliente: req.body.IdCliente,
        IdMascota: req.body.IdMascota,
        IdVeterinario: req.body.IdVeterinario,
        IdAdministrador: req.body.IdAdministrador,
        Telefono: req.body.Telefono,
        Hora: req.body.Hora,
        Fecha: req.body.Fecha
    });

    // Guarda la cita en la base de datos.
    Cita.create(nuevaCita, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "No se pudo crear la cita correctamente."
        });
        else res.send(data);
    });
};

// Obtiene la lista de citas del usuario.
exports.findAll = (req, res) => {
    Cita.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    // Valida si el usuario ingreso parámetros.
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Crea la nueva cita.
    const cita = new Cita({
        IdCita: req.body.IdCita,
        IdCliente: req.body.IdCliente,
        IdMascota: req.body.IdMascota,
        IdVeterinario: req.body.IdVeterinario,
        IdAdministrador: req.body.IdAdministrador,
        Telefono: req.body.Telefono,
        Hora: req.body.Hora,
        Fecha: req.body.Fecha
    });

    // Guarda la cita en la base de datos.
    Cita.update(cita, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "No se pudo actualizar la consulta."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    // Valida si el usuario ingreso parámetros.
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Valida si el usuario ingreso el id de la cita.
    if (!req.body.IdCita){
        res.status(400).send({
            message: "No envío ningún id de la cita."
        });
    }

    const idCita = req.body.IdCita;

    Cita.getOne(idCita, (err, resultado) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "No se encontraron datos referentes con respecto a esa cita."
          });
        else {
            const citaSeleccionada = new Cita(resultado);
            res.send(citaSeleccionada);
        }
    });
};

exports.findId = (req, res) => {
    // Valida si el usuario ingreso parámetros.
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Valida si el usuario ingreso el id de la cita.
    if (!req.body.Cedula){
        res.status(400).send({
            message: "No se ingresó ninguna cédula."
        });
    }

    const cedula = req.body.Cedula;

    Cita.getDataId(cedula, (err, resultado) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "No se encontraron datos referentes con respecto a esa cédula."
          });
        else res.send(resultado);
    });
};

exports.delete = (req, res) => {
    // Valida si el usuario ingreso parámetros para eliminar.
    if (!req.body) {
        res.status(400).send({
        message: "El contenido está vacío."
        });
    }

    // Valida si el usuario ingreso el id de la cita.
    if (!req.body.IdCita){
        res.status(400).send({
            message: "No ha seleccionado ningún registro para eliminar."
        });
    }

    const idCita = req.body.IdCita;

    // Guarda la cita en la base de datos.
    Cita.delete(idCita, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "No se pudo eliminar la cita correctamente."
            });
        else res.send(data);
    });
};
