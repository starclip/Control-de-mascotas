/**************************************************************************************************************** */
/* Elimina los datos de la tabla y setea los ids automáticos a 0 */

DELETE FROM tratamientoxmascota;
ALTER TABLE tratamientoxmascota AUTO_INCREMENT = 0;

DELETE FROM cita;
ALTER TABLE cita AUTO_INCREMENT = 0;

DELETE FROM tratamiento;
ALTER TABLE tratamiento AUTO_INCREMENT = 0;

DELETE FROM mascota;
ALTER TABLE mascota AUTO_INCREMENT = 0;

DELETE FROM administrador;
ALTER TABLE administrador AUTO_INCREMENT = 0;

DELETE FROM veterinario;
ALTER TABLE veterinario AUTO_INCREMENT = 0;

DELETE FROM cliente;
ALTER TABLE cliente AUTO_INCREMENT = 0;

DELETE FROM persona;
ALTER TABLE persona AUTO_INCREMENT = 0;

DELETE FROM tipomascota;
ALTER TABLE tipomascota AUTO_INCREMENT = 0;

/**************************************************************************************************************** */
/* Datos de las personas de la aplicación */

INSERT INTO persona (Nombre, Apellido, cedula, Correo, Telefono, Direccion)
VALUES ('Jason Andrés', 'Barrantes Arce', '116670108', 'starclip3297@gmail.com', '8467-5951', 'Hatillo 5');

SET @IdPersonaJason = LAST_INSERT_ID();

INSERT INTO persona (Nombre, Apellido, cedula, Correo, Telefono, Direccion)
VALUES ('Samantha Carolina', 'Mendoza Peralta', '115570101', 'smendozap@gmail.com', '8743-0882', 'San Diego');

SET @IdPersonaSam = LAST_INSERT_ID();

INSERT INTO persona (Nombre, Apellido, cedula, Correo, Telefono, Direccion)
VALUES ('Thomas', 'Gavilan', '112560102', 'thomas@gmail.com', '8808-2021', 'Cartago Centro');

SET @IdPersonaAdmin = LAST_INSERT_ID();

INSERT INTO persona (Nombre, Apellido, cedula, Correo, Telefono, Direccion)
VALUES ('Jorge', 'Romero', '114578569', 'doctor@gmail.com', '2246-5251', 'Tres Ríos');

SET @IdPersonaVeterinario = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Datos de los administradores de la aplicación */

INSERT INTO administrador (IdPersona, Usuario, Contrasena)
VALUES (@IdPersonaAdmin, 'Admin', 'Admin');

SET @IdAdministrador = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Datos de los veterinarios de la aplicación */

INSERT INTO veterinario (IdPersona, Activo)
VALUES (@IdPersonaVeterinario, 1);

SET @IdVeterinario = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Datos de los clientes (dueños) de la aplicación */

INSERT INTO cliente (IdPersona, Activo)
VALUES (@IdPersonaJason, 1);

SET @IdClienteJason = LAST_INSERT_ID();

INSERT INTO cliente (IdPersona, Activo)
VALUES (@IdPersonaSam, 1);

SET @IdClienteSam = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Tipos de las mascotas de la aplicación */

INSERT INTO tipomascota (Nombre)
VALUES ('Perro');

SET @IdTipoPerro = LAST_INSERT_ID();

INSERT INTO tipomascota (Nombre)
VALUES ('Gato');

SET @IdTipoGato = LAST_INSERT_ID();

INSERT INTO tipomascota (Nombre)
VALUES ('Conejo');

SET @IdTipoConejo = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Mascotas de la aplicación */

INSERT INTO mascota (IdCliente, IdTipoMascota, Nombre, Descripcion, TieneChip)
VALUES (@IdClienteJason, @IdTipoPerro, 'Vivi', 'Es un pinscher miniatura, delgada y de color negro.', 0);

SET @IdMascotaVivi = LAST_INSERT_ID();

INSERT INTO mascota (IdCliente, IdTipoMascota, Nombre, Descripcion, TieneChip)
VALUES (@IdClienteJason, @IdTipoGato, 'Schrodinger (Sho)', 'Es un gato grande, de color blanco con franjas naranjas.', 0);

SET @IdMascotaSho = LAST_INSERT_ID();

INSERT INTO mascota (IdCliente, IdTipoMascota, Nombre, Descripcion, TieneChip)
VALUES (@IdClienteSam, @IdTipoPerro, 'Riley', 'Es un perro golden retriever combinado con zaguate, pequeñito y malcriado, pero muy dulce.', 0);

SET @IdMascotaRiley = LAST_INSERT_ID();

INSERT INTO mascota (IdCliente, IdTipoMascota, Nombre, Descripcion, TieneChip)
VALUES (@IdClienteSam, @IdTipoGato, 'Koneka', 'Es una gata pequeña, blanca con parches negros.', 0);

SET @IdMascotaKoneka = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Tratamientos de la aplicación */

INSERT INTO tratamiento (Nombre, Descripcion, Tarifa, Efectos)
VALUES ('Castración', 'Se remueven los órganos sexuales de la mascota', 20000, 'La mascota necesita reposo y cuidados por parte del dueño');

SET @IdTratamientoCastracion = LAST_INSERT_ID();

INSERT INTO tratamiento (Nombre, Descripcion, Tarifa, Efectos)
VALUES ('Desparasitante', 'Se remueven los parásitos que tenga la mascota', 10000, 'La mascota requiere que el dueño lo cuide bastante.');

SET @IdTratamientoDesparasitante = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Citas de la aplicación */

INSERT INTO Cita (IdMascota, IdAdministrador, IdVeterinario, Telefono, Fecha, Estado)
VALUES (@IdMascotaRiley, @IdAdministrador, @IdVeterinario, '2215-2101', NOW(), 'P');

SET @IdCitaRiley = LAST_INSERT_ID();

INSERT INTO Cita (IdMascota, IdAdministrador, IdVeterinario, Telefono, Fecha, Estado)
VALUES (@IdMascotaKoneka, @IdAdministrador, @IdVeterinario, '2215-2101', NOW(), 'P');

SET @IdCitaKoneka = LAST_INSERT_ID();

INSERT INTO Cita (IdMascota, IdAdministrador, IdVeterinario, Telefono, Fecha, Estado)
VALUES (@IdMascotaSho, @IdAdministrador, @IdVeterinario, '2215-2101', NOW(), 'P');

SET @IdCitaSho = LAST_INSERT_ID();

INSERT INTO Cita (IdMascota, IdAdministrador, IdVeterinario, Telefono, Fecha, Estado)
VALUES (@IdMascotaVivi, @IdAdministrador, @IdVeterinario, '2215-2101', NOW(), 'F');

SET @IdCitaVivi = LAST_INSERT_ID();

/**************************************************************************************************************** */
/* Mascotas que tienen tratamientos asociados. */

INSERT INTO tratamientoxmascota (IdCita, IdTratamiento, IdAdministrador, IdMascota, Preescripcion, Fecha)
VALUES (@IdCitaRiley, @IdTratamientoDesparasitante, @IdAdministrador, @IdMascotaRiley, 'Realizar una inyección cada 3 meses.', NOW());

INSERT INTO tratamientoxmascota (IdCita, IdTratamiento, IdAdministrador, IdMascota, Preescripcion, Fecha)
VALUES (@IdCitaVivi, @IdTratamientoCastracion, @IdAdministrador, @IdMascotaVivi, 'Se realizó la castración debe tener cuidado.', NOW());