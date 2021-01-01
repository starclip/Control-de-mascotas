DROP PROCEDURE IF EXISTS obtenerClientes;

/* Se crea el procedimiento para obtener la lista de clientes. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerClientes`()
    NO SQL

    SELECT C.IdCliente,
    P.Cedula, 
    P.Nombre,
    P.Apellido, 
    P.Correo, 
    P.Telefono,
    P.Direccion,
    M.Mascota
    FROM cliente C
    Inner join persona P
    ON C.IdPersona = P.IdPersona
    INNER JOIN (
        SELECT IdCliente, GROUP_CONCAT(Nombre) AS Mascota
        FROM mascota
        GROUP BY IdCliente
    ) M
    ON M.IdCliente = C.IdCliente

DELIMITER ;


/* Se crea el procedimiento para obtener un cliente específico. */
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerClienteEspecifico`(IN `IdCliente` INT)
    NO SQL
SELECT
C.IdCliente,
P.Cedula,
P.Nombre,
P.Apellido,
P.Correo, 
P.Telefono, 
P.Direccion
FROM cliente C
Inner join persona P 
ON C.IdPersona = P.IdPersona 
WHERE IdCliente$$
DELIMITER ;