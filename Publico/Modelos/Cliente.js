const connection = require("./db.js");
const sql = require("./db.js");

// Constructor de la clase cita.
const Cliente = function (Cliente){
 /*   this.nombreMascota = cita.nombreMascota;
    this.cedula = cita.cedula;
    this.propietario = cita.propietario;
    this.apellido = cita.apellido;
    this.hora = cita.hora;
    this.fecha = cita.fecha;
    */
}

// Cuando se cree una nueva cita.
Cliente.create = (nuevaCita, result) => {

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

module.exports = Cita;