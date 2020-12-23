const connection = require("./db.js");
const sql = require("./db.js");

// Constructor de la clase cita.
const Cita = function (cita){
    this.idCita = cita.IdCita;
    this.idCliente = cita.IdCliente;
    this.idMascota = cita.IdMascota;
    this.nombreMascota = cita.NombreMascota;
    this.cedula = cita.Cedula;
    this.telefono = cita.Telefono;
    this.propietario = cita.Propietario;
    this.apellido = cita.Apellido;
    this.hora = cita.Hora;
    this.fecha = cita.Fecha;
    this.idVeterinario = cita.IdVeterinario;
    this.veterinario = cita.Veterinario;
}

// Cuando se cree una nueva cita.
Cita.create = (nuevaCita, result) => {

    connection.query("call insertarCita(?,?)", [param1, param2], function (err, result) {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
    });
}

// Obtenga la lista de las citas.
Cita.getAll = result => {

    connection.query("call obtenerCitas", function (err, res) {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", res[0]);
            result(null, res[0]);
        }
    });
}

// Obtenga los datos específicos de una cita.
Cita.getOne = (idCita, result) => {

    connection.query("call obtenerCita(?)", [idCita], function (err, res) {
        if (err) {
            console.log("err:", err);
        } else {
            result(null, res[0][0]);
        }
    });
}

module.exports = Cita;