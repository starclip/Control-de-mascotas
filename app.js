// Requerimos el http para obtener las llamadas de ajax.
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Conexión a mysql server.
const mysql = require('mysql');

// Conexión a la base de datos.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'Mascotas'
});

// Verifica la conexión de la base de datos.
connection.connect((err) => {
   if (err) throw err;
   console.log('Estoy conectado a la base de datos de mascotas.');
 });

 //set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Publico"));

// Configurar la página de inicio o home.
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname +'/Publico/Vistas/Citas/Citas.html'));
});

// Configure los routers de la aplicación.
app.use('/Citas', require('./Publico/Routers/citas.js')); // router de las citas.

app.listen(port);
console.debug('Server listening on port ' + port);
