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
