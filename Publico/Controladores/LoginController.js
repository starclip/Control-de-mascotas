const Administrador = require('../Modelos/Administrador.js');

// Comprueba que el administrador haya o no, iniciado la sesión.
exports.obtenerSesion = (req, res) => {
    if (req.session && req.session.admin)
        res.send({ "estado" : true, "nombre": req.session.nombre + ' ' + req.session.apellido });
    else
        res.send({ "estado" : false });
}

// Comprueba que el administrador tenga el usuario y la contraseña.
exports.iniciarSesion = (req, res) => {

    // Valida si el usuario ingreso parámetros.
    if (!req.body) {
        res.status(400).send({
            estado: false,
            tipo: "3",
            mensaje: "El contenido está vacío."
        });
    }
    
    // Valida si el usuario ingreso el usuario y la contraseña.
    if (!req.body.Usuario || !req.body.Contrasena) {
        res.send({
            estado: false,
            tipo: "3",
            mensaje: "Debe ingresar un usuario y una contraseña"
        });
    }

    var datosEnviar = {
        "usuario": req.body.Usuario,
        "contrasena": req.body.Contrasena
    };

    // Se realizo el inicio de sesión.
    Administrador.iniciarSesion(datosEnviar, function (error, datos){
        // Si la solicitud reportó un error.
        if (error)
            res.status(400).send(datos);

        var administrador = new Administrador(datos);

        // Si el login fue exitoso.
        if (datos.Estado == true){
            req.session.administrador = administrador.usuario;
            req.session.nombre = administrador.nombre;
            req.session.apellido = administrador.apellido;
            req.session.idAdministrador = administrador.idAdministrador;
            req.session.admin = true;

            res.send({
                nombre: administrador.nombre + ' ' + administrador.apellido,
                estado: true,
                tipo: "4",
                mensaje: "Se inició sesión exitosamente"
            });
        }else{
            res.send({
                estado: false,
                tipo: "3",
                mensaje: "La contraseña y el usuario no existen en la aplicación."
            });
        }
    });
};

// Cierro la sesión actual.
exports.cerrarSesion = (req, res) => {
    req.session.administrador = null;
    req.session.nombre = null;
    req.session.apellido = null;
    req.session.idAdministrador = null;
    req.session.admin = null;

    res.send({
        tipo: "4",
        estado: true,
        mensaje: "Se cerró la sesión"
    });
}
