const connection = require("./db.js");
const sql = require("./db.js");

// Constructor de la clase Administrador.
const Administrador = function (administrador){
    this.idAdministrador = administrador.IdAdministrador;
    this.nombre = administrador.Nombre;
    this.apellido = administrador.Apellido;
    this.estado = administrador.Estado;
    this.usuario = administrador.Usuario;
}

Administrador.iniciarSesion = (datos, result) => {
    connection.query("call iniciarSesion(?,?)", 
    [
        datos.usuario,
        datos.contrasena
    ], 
    function(err, res){
        if (err) {
            result(err, { estado: false, mensaje: "No funcionó correctamente" });
        } else {
            if (res[0].length > 0){
                result(null, res[0][0]);
            }else{
                result(null, { estado: false });
            }
        }
    })
}

module.exports = Administrador;