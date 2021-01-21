DROP PROCEDURE IF EXISTS iniciarSesion;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `iniciarSesion`(IN `Usuario` VARCHAR(50), IN `Contrasena` VARCHAR(100))
    NO SQL
SELECT 
    A.Usuario,
	A.IdAdministrador,
	P.Nombre,
    P.Apellido,
    1 AS Estado
FROM administrador A
INNER JOIN persona P
ON A.IdPersona = P.IdPersona
WHERE A.Usuario = Usuario AND A.Contrasena = Contrasena$$
DELIMITER ;