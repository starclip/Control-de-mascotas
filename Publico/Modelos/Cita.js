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
    this.idAdministrador = cita.IdAdministrador;
}

// Cuando se cree una nueva cita.
Cita.create = (nuevaCita, result) => {

    connection.query("call insertarCita(?,?,?,?,?)", 
        [
            nuevaCita.idMascota, 
            nuevaCita.idAdministrador, 
            nuevaCita.idVeterinario,
            nuevaCita.telefono,
            new Date(nuevaCita.fecha + " " + nuevaCita.hora)
        ], function (err, res) {
        if (err) {
            console.log("Error:", err);
        } else {
            if (res.affectedRows > 0){
                console.log("Se insertó exitosamente");
                result(null, true);
            }else{
                console.log("No se insertó ningún registro");
                result(null, false);
            }
        }
    });
}

// Cuando se actualiza la cita.
Cita.update = (cita, result) => {

    connection.query("call actualizarCita(?,?,?,?,?,?)", 
    [
        cita.idCita,
        cita.idMascota, 
        cita.idAdministrador, 
        cita.idVeterinario,
        cita.telefono,
        new Date(cita.fecha + " " + cita.hora)
    ], function (err, res) {
        if (err) {
            console.log("Error:", err);
        } else {
            if (res.affectedRows > 0){
                console.log("Se actualizó exitosamente");
                result(null, true);
            }else{
                console.log("No se actualizó ningún registro");
                result(null, false);
            }
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

// Obtenga los datos de una persona dada una cédula.
Cita.getDataId = (cedula, result) => {
    connection.query("call obtenerDatosCedula(?)", [cedula], function (err, res) {
        if (err) {
            console.log("Error:", err);
        } else {
            result(null, res[0][0]);
        }
    });
}

module.exports = Cita;