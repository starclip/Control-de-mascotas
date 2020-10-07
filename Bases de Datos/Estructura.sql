-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2020 at 03:06 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mascotas`
--
CREATE DATABASE IF NOT EXISTS `mascotas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mascotas`;

-- --------------------------------------------------------

--
-- Table structure for table `administrador`
--

CREATE TABLE `administrador` (
  `IdAdministrador` int(11) NOT NULL,
  `IdPersona` int(11) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `administrador`:
--   `IdPersona`
--       `persona` -> `IdPersona`
--

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE `cita` (
  `IdCita` int(11) NOT NULL,
  `IdMascota` int(11) NOT NULL,
  `IdAdministrador` int(11) NOT NULL,
  `IdVeterinario` int(11) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Estado` char(1) NOT NULL DEFAULT 'P'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `cita`:
--   `IdMascota`
--       `mascota` -> `IdMascota`
--   `IdAdministrador`
--       `administrador` -> `IdAdministrador`
--   `IdVeterinario`
--       `veterinario` -> `IdVeterinario`
--

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `IdCliente` int(11) NOT NULL,
  `IdPersona` int(11) NOT NULL,
  `Activo` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `cliente`:
--   `IdPersona`
--       `persona` -> `IdPersona`
--   `IdPersona`
--       `persona` -> `IdPersona`
--

-- --------------------------------------------------------

--
-- Table structure for table `mascota`
--

CREATE TABLE `mascota` (
  `IdMascota` int(11) NOT NULL,
  `IdTipoMascota` int(11) NOT NULL,
  `IdCliente` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Foto` longblob DEFAULT NULL,
  `TieneChip` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `mascota`:
--   `IdTipoMascota`
--       `tipomascota` -> `IdTipoMascota`
--   `IdCliente`
--       `cliente` -> `IdCliente`
--

-- --------------------------------------------------------

--
-- Table structure for table `persona`
--

CREATE TABLE `persona` (
  `IdPersona` int(11) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `persona`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tipomascota`
--

CREATE TABLE `tipomascota` (
  `IdTipoMascota` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `tipomascota`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tratamiento`
--

CREATE TABLE `tratamiento` (
  `IdTratamiento` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Foto` longblob DEFAULT NULL,
  `Efectos` varchar(500) NOT NULL,
  `Tarifa` decimal(15,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `tratamiento`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tratamientoxmascota`
--

CREATE TABLE `tratamientoxmascota` (
  `IdTratamientoXMascota` int(11) NOT NULL,
  `IdMascota` int(11) NOT NULL,
  `IdCita` int(11) NOT NULL,
  `IdTratamiento` int(11) NOT NULL,
  `IdAdministrador` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Preescripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `tratamientoxmascota`:
--   `IdMascota`
--       `mascota` -> `IdMascota`
--   `IdCita`
--       `cita` -> `IdCita`
--   `IdTratamiento`
--       `tratamiento` -> `IdTratamiento`
--   `IdAdministrador`
--       `administrador` -> `IdAdministrador`
--

-- --------------------------------------------------------

--
-- Table structure for table `veterinario`
--

CREATE TABLE `veterinario` (
  `IdVeterinario` int(11) NOT NULL,
  `IdPersona` int(11) NOT NULL,
  `Activo` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `veterinario`:
--   `IdPersona`
--       `persona` -> `IdPersona`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`IdAdministrador`),
  ADD KEY `IdPersona` (`IdPersona`);

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`IdCita`),
  ADD KEY `IdMascota` (`IdMascota`),
  ADD KEY `IdAdministrador` (`IdAdministrador`),
  ADD KEY `IdVeterinario` (`IdVeterinario`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`IdCliente`),
  ADD KEY `IdPersona` (`IdPersona`);

--
-- Indexes for table `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`IdMascota`),
  ADD KEY `IdTipoMascota` (`IdTipoMascota`),
  ADD KEY `IdCliente` (`IdCliente`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`IdPersona`);

--
-- Indexes for table `tipomascota`
--
ALTER TABLE `tipomascota`
  ADD PRIMARY KEY (`IdTipoMascota`);

--
-- Indexes for table `tratamiento`
--
ALTER TABLE `tratamiento`
  ADD PRIMARY KEY (`IdTratamiento`);

--
-- Indexes for table `tratamientoxmascota`
--
ALTER TABLE `tratamientoxmascota`
  ADD PRIMARY KEY (`IdTratamientoXMascota`),
  ADD KEY `IdMascota` (`IdMascota`),
  ADD KEY `IdCita` (`IdCita`),
  ADD KEY `IdTratamiento` (`IdTratamiento`),
  ADD KEY `IdAdministrador` (`IdAdministrador`);

--
-- Indexes for table `veterinario`
--
ALTER TABLE `veterinario`
  ADD PRIMARY KEY (`IdVeterinario`),
  ADD KEY `IdPersona` (`IdPersona`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrador`
--
ALTER TABLE `administrador`
  MODIFY `IdAdministrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cita`
--
ALTER TABLE `cita`
  MODIFY `IdCita` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mascota`
--
ALTER TABLE `mascota`
  MODIFY `IdMascota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persona`
--
ALTER TABLE `persona`
  MODIFY `IdPersona` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipomascota`
--
ALTER TABLE `tipomascota`
  MODIFY `IdTipoMascota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tratamiento`
--
ALTER TABLE `tratamiento`
  MODIFY `IdTratamiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tratamientoxmascota`
--
ALTER TABLE `tratamientoxmascota`
  MODIFY `IdTratamientoXMascota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `veterinario`
--
ALTER TABLE `veterinario`
  MODIFY `IdVeterinario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`IdPersona`) REFERENCES `persona` (`IdPersona`);

--
-- Constraints for table `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`IdMascota`) REFERENCES `mascota` (`IdMascota`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`IdAdministrador`) REFERENCES `administrador` (`IdAdministrador`),
  ADD CONSTRAINT `cita_ibfk_3` FOREIGN KEY (`IdVeterinario`) REFERENCES `veterinario` (`IdVeterinario`);

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`IdPersona`) REFERENCES `persona` (`IdPersona`);

--
-- Constraints for table `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `mascota_ibfk_1` FOREIGN KEY (`IdTipoMascota`) REFERENCES `tipomascota` (`IdTipoMascota`),
  ADD CONSTRAINT `mascota_ibfk_2` FOREIGN KEY (`IdCliente`) REFERENCES `cliente` (`IdCliente`);

--
-- Constraints for table `tratamientoxmascota`
--
ALTER TABLE `tratamientoxmascota`
  ADD CONSTRAINT `tratamientoxmascota_ibfk_1` FOREIGN KEY (`IdMascota`) REFERENCES `mascota` (`IdMascota`),
  ADD CONSTRAINT `tratamientoxmascota_ibfk_2` FOREIGN KEY (`IdCita`) REFERENCES `cita` (`IdCita`),
  ADD CONSTRAINT `tratamientoxmascota_ibfk_3` FOREIGN KEY (`IdTratamiento`) REFERENCES `tratamiento` (`IdTratamiento`),
  ADD CONSTRAINT `tratamientoxmascota_ibfk_4` FOREIGN KEY (`IdAdministrador`) REFERENCES `administrador` (`IdAdministrador`);

--
-- Constraints for table `veterinario`
--
ALTER TABLE `veterinario`
  ADD CONSTRAINT `veterinario_ibfk_1` FOREIGN KEY (`IdPersona`) REFERENCES `persona` (`IdPersona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
