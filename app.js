// Requerimos el http para obtener las llamadas de ajax.
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); // Cargo el servidor.
const port = 3000;

 //set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Publico")); // Carga los archivos en la carpeta publica al servidor.

// Configurar la página de inicio o home.
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Index.html'));
});

// Las citas de la aplicación.
app.get('/Citas', function(req,res){
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

app.listen(port);
console.debug('Server listening on port ' + port);
