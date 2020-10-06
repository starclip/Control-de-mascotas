var express = require('express');
var mysql = require('mysql');

// Conexión a la base de datos.
var app = express();

const connection = mysql.createConnection({
    host: 'localhost:8080',
    user: 'admin',
    password: 'admin',
    database: 'mascotas'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});