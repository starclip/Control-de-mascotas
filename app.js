var express = require('express');
var mysql = require('mysql');

// Conexión a la base de datos.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'Mascotas'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

var app = express();

app.listen('3000', () => {
    console.log('Estoy conectado');
});

