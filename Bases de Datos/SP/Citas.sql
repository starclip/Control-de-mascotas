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
        M.IdCliente 
    FROM cita C
    INNER JOIN mascota M
        ON M.IdMascota = C.IdMascota
    INNER JOIN cliente CL
        ON M.IdCliente = CL.IdCliente
    INNER JOIN persona P
        ON P.IdPersona = CL.IdPersona
    WHERE DATE(C.Fecha) = DATE(NOW())$$
DELIMITER ;

