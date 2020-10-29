const sql = require("./db.js");

const Cita = function (cita){
    this.nombreMascota = cita.nombreMascota;
    this.cedula = cita.cedula;
    this.propietario = cita.propietario;
    this.apellido = cita.apellido;
    this.hora = cita.hora;
    this.fecha = cita.fecha;
}

Cita.create = (nuevaCita, result) => {

    connection.query("call insertarCita(?,?)", [param1, param2], function (err, result) {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
    
    });

    // sql.query("INSERT INTO dbo.citas SET ?", nuevaCita, (err, res) => {
    //     if (err) {
    //       console.log("error: ", err);
    //       result(err, null);
    //       return;
    //     }
    
    //     console.log("created customer: ", { id: res.insertId, ...newCustomer });
    //     result(null, { id: res.insertId, ...newCustomer });
    // });
}

module.exports = Cita;