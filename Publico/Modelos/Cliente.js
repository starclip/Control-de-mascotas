const connection = require("./db.js");
const sql = require("./db.js");

// Constructor de la clase Cliente.

const Cliente = function (Cliente){
    this.idCliente = Cliente.IdCliente;
    this.cedula = Cliente.Cedula;
    this.nombre = Cliente.Nombre;
    this.apellido = Cliente.Apellido;
    this.correo = Cliente.Correo;
    this.telefono = Cliente.Telefono;
    this.direccion = Cliente.Direccion;
}

// Cuando se cree un nuevo registro.
Cliente.create = (nuevaCliente, result) => {

    connection.query("call insertarCliente(?,?)", [param1, param2], function (err, result) {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", result);
        }
    });
}

// Obtenga la lista de los clientes.
Cliente.getAll = result => {

    connection.query("call obtenerClientes", function (err, res) {
        if (err) {
            console.log("err:", err);
        } else {
            console.log("results:", res[0]);
            result(null, res[0]);
        }
    });
}

// Obtenga los datos específicos de un cliente.
Cliente.getOne = (idCliente, result) => {

    connection.query("call obtenerClienteEspecifico(?)", [idCliente], function (err, res) {
        if (err) {
            console.log("err:", err);
        } else {
            result(null, res[0][0]);
        }
    });

}

module.exports = Cliente;