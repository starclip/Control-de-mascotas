DROP PROCEDURE IF EXISTS obtenerCitas;

/* Se crea el procedimiento para obtener la lista de citas. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerCitas`()
    NO SQL
SELECT 
        C.IdCita,
        C.IdMascota,
        M.Nombre AS NombreMascota,
        M.Foto,
        CONCAT(P.Nombre, ' ', P.Apellido) AS Propietario,
        C.Fecha,
        P.Telefono,
        M.IdCliente,
        V.IdVeterinario,
        CONCAT('Dr. ', PV.Nombre, ' ', PV.Apellido) AS Veterinario
    FROM cita C
    INNER JOIN mascota M
        ON M.IdMascota = C.IdMascota
    INNER JOIN cliente CL
        ON M.IdCliente = CL.IdCliente
    INNER JOIN persona P
        ON P.IdPersona = CL.IdPersona
    INNER JOIN veterinario V
    	ON V.IdVeterinario = C.IdVeterinario
    INNER JOIN persona PV
    	ON PV.IdPersona = V.IdPersona$$
DELIMITER ;

/* Se crea el procedimiento para obtener una cita específica. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerCita`(IN `IdCita` INT)
    NO SQL
SELECT 
        C.IdCita,
        C.IdMascota,
        M.Nombre AS NombreMascota,
        M.Foto,
        CONCAT(P.Nombre, ' ', P.Apellido) AS Propietario,
        C.Fecha,
        P.Telefono,
        M.IdCliente,
        V.IdVeterinario,
        CONCAT('Dr. ', PV.Nombre, ' ', PV.Apellido) AS Veterinario
    FROM cita C
    INNER JOIN mascota M
        ON M.IdMascota = C.IdMascota
    INNER JOIN cliente CL
        ON M.IdCliente = CL.IdCliente
    INNER JOIN persona P
        ON P.IdPersona = CL.IdPersona
    INNER JOIN veterinario V
    	ON V.IdVeterinario = C.IdVeterinario
    INNER JOIN persona PV
    	ON PV.IdPersona = V.IdPersona
WHERE C.IdCita = IdCita$$
DELIMITER ;

/* Se crea el procedimiento para obtener los datos dado una cédula específica. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerDatosCedula`(IN `cedula` VARCHAR(12))
    NO SQL
SELECT 
C.IdCliente,
CONCAT(P.Nombre, ' ', P.Apellido) AS Propietario,
P.Telefono,
M.IdMascotas,
M.NombreMascotas
FROM persona P
INNER JOIN cliente C
ON P.IdPersona = C.IdPersona
INNER JOIN (
        SELECT IdCliente, GROUP_CONCAT(IdMascota) AS IdMascotas, GROUP_CONCAT(Nombre) AS NombreMascotas
        FROM mascota
        GROUP BY IdCliente
    ) M
    ON M.IdCliente = C.IdCliente
WHERE P.cedula = cedula$$
DELIMITER ;

/* Se crea el procedimiento para insertar una cita al sistema. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarCita`(
    IN `IdMascota` INT,
    IN `IdAdministrador` INT,
    IN `IdVeterinario` INT,
    IN `Telefono` VARCHAR(10),
    IN `Fecha` DATETIME)
    NO SQL
INSERT cita (IdMascota, IdAdministrador, IdVeterinario, Telefono, Fecha, Estado)
VALUES (IdMascota, IdAdministrador, IdVeterinario, Telefono, Fecha, 'P')

$$
DELIMITER ;

/* Se crea el procedimiento para actualizar la cita del sistema. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarCita`(
    IN `IdCita` INT,
    IN `IdMascota` INT,
    IN `IdAdministrador` INT,
    IN `IdVeterinario` INT,
    IN `Telefono` VARCHAR(10),
    IN `Fecha` DATETIME)
    NO SQL
UPDATE cita C
SET 
    C.IdMascota = IdMascota, 
    C.IdAdministrador = IdAdministrador, 
    C.IdVeterinario = IdVeterinario, 
    C.Telefono = Telefono, 
    C.Fecha = Fecha
WHERE C.IdCita = IdCita;
$$
DELIMITER ;