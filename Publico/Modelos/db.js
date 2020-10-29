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

 module.exports = connection;