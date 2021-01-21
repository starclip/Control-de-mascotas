// Requerimos el http para obtener las llamadas de ajax.
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); // Cargo el servidor.
const port = 3000;

//set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));

// Define la seguridad que va a ser a través de cookies y las variables de sesión.
app.use(session({ 
    secret:'keyboard cat',
    resave: true,
    saveUninitialized: true, 
    cookie: { secure: false } // Esto verifica si la seguridad se hace a tráves de https:
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Publico")); // Carga los archivos en la carpeta publica al servidor.

// Autenticación.
var auth = function(req, res, next) {
    if (req.session && req.session.admin)
      return next();
    else
      return res.sendStatus(401);
};

// Configurar la página de inicio o home.
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Index.html'));
});

// Las citas de la aplicación.
app.get('/Citas', auth, function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Citas/Citas.html'));
});

// Las mascotas de la aplicación.
app.get('/Mascotas', function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Mascotas/Mascotas.html'));
});

// Las citas de la aplicación.
app.get('/Clientes', function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Clientes/Clientes.html'));
});

// Las mascotas de la aplicación.
app.get('/Tratamientos', function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Tratamientos/Tratamientos.html'));
});

// Configure los routers de la aplicación.
app.use('/Citas', require('./Publico/Routers/citas.js')); // router de las citas.
app.use('/Clientes', require('./Publico/Routers/Clientes.js')); // router de los clientes.
app.use('/Login', require('./Publico/Routers/Login.js')); // Router del login.

app.listen(port);
console.debug('Server listening on port ' + port);
