// Función que crea los eventos de los botones de la página del login.
function inicializarEventosLogin(){

    // Se genera el evento del login.
    var url = "/Login/ObtenerSesion";

    $.ajax({  
        url: url,  
        type:'GET', 
        contentType: "application/x-www-form-urlencoded",
        success: function(datos){ 
            var opciones = {
                id: "",
                class: "dropdown-item",
                type: "button",
                text: ""
            };
            
            // Si la sesión no está iniciada, cargo el botón de iniciar sesión.
            if (!datos.estado){
                opciones.id = "botonIniciarSesion";
                opciones.text = "Iniciar Sesión";
            }else{
                cambiarNombreAdministrador(datos.nombre);
                opciones.id = "botonCerrarSesion";
                opciones.text = "Cerrar Sesión";
            }

            var boton = $("<button>", opciones);

            // Ejecute la función de cuando presione el botón.
            boton.on('click', function(e){
                if (this.id == "botonIniciarSesion")
                    mostrarIniciarSesion();
                else
                    mostrarCerrarSesion();
            });

            // Agregue el botón a las opciones disponibles.
            $('#opcionesSesion').empty();
            $("#opcionesSesion").append(boton);
        },
        error: imprimirError
    });  
}

// Función que carga la acción del login de inicio de sesión.
function mostrarIniciarSesion(){
    $("#loginUsuario").remove();

    var modalInicioSesion = generarHTML();
    $("body").append(modalInicioSesion);
    $("#loginUsuario").modal('show');
}

// Función que carga la acción del login de cierre de sesión.
function mostrarCerrarSesion(){
    general.mostrarMensaje({
        estado: "1",
        mensaje: "¿Está seguro que desea cerrar la sesión?",
        botones: [
            {
                "codigo": "cerrarSesion",
                "texto": "Cerrar",
                "funcion": function(e){
                    general.cerrarMensaje();
                    cerrarSesion();
                }
            }, 
            {
                "codigo": "cancelarCerrar",
                "texto": "Cancelar"
            }
        ]
    });
}

// Función que genera el html del modal de login.
function generarHTML(){

    var contenedorModal = $("<div>", {
        id: "loginUsuario",
        class: "modal fade text-center"
    });

    var modal = $("<div>", {
        class: "modal-dialog",
        id: "dialogLoginUsuario"
    });

    var contenedor = $("<div>", {
        class: "modal-content"
    });

    var header = $("<div>", {
        class: "modal-header"
    });

    var body = $("<div>", {
        class: "modal-body"
    });

    var footer = $("<div>", {
        class: "modal-footer",
        style: "display:inline;"
    });

    // Header.

    var tituloHeader = $("<h5>", {
        class: "modal-title",
        id: "tituloLogin",
        text: "Iniciar sesión de administrador"
    });

    var botonHeader = $("<button>", {
        class: "close",
        "data-dismiss": "modal",
        "aria-label": "Close",
        style: "margin-left:150px;"
    });

    var span = $("<span aria-hidden='true'>&times;</span>");
    // Body.

    var formulario = $("<form>", {
        id: "formularioCitas"
    });

    var grupoFormulario = $("<div>", {
        class: "form-group"
    });

    var filaPrimaria = $("<div>", {
        class: "row"
    });

    var columna = $("<div>", {
        class: "col-sm-12"
    });

    var filaUsuario = $("<div>", {
        class: "row"
    });

    var divLabelUsuario = $("<div>", {
        class: "col-sm-3"
    });

    var labelUsuario = $("<label>", {
        text: "Usuario:"
    });

    var divUsuario = $("<div>", {
        class: "col-sm-9"
    });

    var agrupacionInput = $("<div>", {
        class: "input-group mb-3"
    });

    var usuario = $("<input>", {
        type: "text",
        id: "UsuarioAdministrador", 
        name: "Usuario", 
        class: "form-control", 
        placeholder: "", 
        "aria-label": "usuario", 
        "aria-describedby" :"Usuario administrador"
    });

    var columnaContrasena = $("<div>", {
        class: "col-sm-12"
    });

    var filaContrasena = $("<div>", {
        class: "row"
    });

    var divLabelContrasena = $("<div>", {
        class: "col-sm-3"
    });

    var labelContrasena = $("<label>", {
        text: "Contraseña:"
    });

    var divContrasena = $("<div>", {
        class: "col-sm-9"
    });

    var agrupacionInputContrasena = $("<div>", {
        class: "input-group mb-3"
    });

    var contrasena = $("<input>", {
        type: "password",
        id: "ContrasenaAdministrador", 
        name: "Contrasena", 
        class: "form-control", 
        placeholder: "", 
        "aria-label": "Contraseña", 
        "aria-describedby" :"Contraseña"
    });

    // Agrego el usuario al formulario.
    agrupacionInput.append(usuario);
    divUsuario.append(agrupacionInput);
    divLabelUsuario.append(labelUsuario);
    filaUsuario.append(divLabelUsuario);
    filaUsuario.append(divUsuario);
    columna.append(filaUsuario);

    // Agrego la contraseña al formulario.
    agrupacionInputContrasena.append(contrasena);
    divContrasena.append(agrupacionInputContrasena);
    divLabelContrasena.append(labelContrasena);
    filaContrasena.append(divLabelContrasena);
    filaContrasena.append(divContrasena);
    columnaContrasena.append(filaContrasena);

    // Agrego ambas columnas al formulario.
    filaPrimaria.append(columna);
    filaPrimaria.append(columnaContrasena);
    grupoFormulario.append(filaPrimaria);
    formulario.append(grupoFormulario);

    // Footer.
    var botonFooter = $("<button>", {
        class: "btn btn-success",
        id: "IniciarSesion",
        type: "button",
        text: "Iniciar Sesión"
    });

    botonFooter.on('click', iniciarSesion);

    // Asigno el header.
    botonHeader.append(span);
    tituloHeader.append(botonHeader);
    header.append(tituloHeader);

    // Asigno el body.
    body.append(formulario);

    // Asigno el footer.
    footer.append(botonFooter);

    contenedor.append(header);
    contenedor.append(body);
    contenedor.append(footer);

    modal.append(contenedor);
    contenedorModal.append(modal);
    return contenedorModal;
}

// Función para cambiar el nombre del usuario administrador en la página.
function cambiarNombreAdministrador(nombre){
    $("#nombreAdministrador").text("Bienvenido " + nombre);
}

// Función para limpiar el nombre del usuario administrador en la página.
function limpiarNombreAdministrador(){
    $("#nombreAdministrador").text("");
}

// Función que me permite iniciar sesión.
function iniciarSesion(){
    var usuario = $("#UsuarioAdministrador").val();
    var contrasena = $("#ContrasenaAdministrador").val();

    if (usuario == null || usuario == "" || usuario == undefined){
        // Mostrar mensaje de que debe agregar un usuario.
        cerrarVentanaLogin();
        general.mostrarMensaje({
            tipo: "2",
            mensaje: "Debe ingresar un usuario."
        });
        return;
    }

    if (contrasena == null || contrasena == "" || contrasena == undefined){
        // Mostrar mensaje de que debe agregar la contraseña.
        cerrarVentanaLogin();
        general.mostrarMensaje({
            tipo: "2",
            mensaje: "Debe ingresar una contraseña."
        });
        return;
    }

    var datos = {
        "Usuario": usuario,
        "Contrasena": contrasena
    };

    var url = "/Login/IniciarSesion";

    $.ajax({  
        url: url,  
        type:'POST', 
        dataType: "json",
        data: datos,
        contentType: "application/x-www-form-urlencoded",
        success: function(datos, status){ 
            if (datos.estado){
                // Se hacen las funciones para agregar el nombre de usuario en la pantalla de arriba.
                cambiarNombreAdministrador(datos.nombre);
                inicializarEventosLogin();
                cerrarVentanaLogin();
            } 
            general.mostrarMensaje(datos);
        },
        error: imprimirError
    });  
}

// Función que me permite cerrar la sesión del usuario.
function cerrarSesion(){
    var url = "/Login/CerrarSesion";

    $.ajax({  
        url: url,  
        type:'POST', 
        dataType: "json",
        data: {},
        contentType: "application/x-www-form-urlencoded",
        success: function(datos, status){ 
            if (datos.estado){
                limpiarNombreAdministrador(datos.nombre);
                inicializarEventosLogin();
            }

            general.mostrarMensaje(datos);
        },
        error: imprimirError
    });  
}

// Función que cierra la ventana de login.
function cerrarVentanaLogin(){
   $("#loginUsuario").hide();
}

// Función que imprime el error en caso de ser un error de ajax.
function imprimirError(xhr){
    try {
        var response = JSON.parse(xhr.responseText);
        console.log('Exitoso.');
        console.log(response);
      }
      catch (e) {
        var response = xhr.responseText;
        console.log(
          'There was an error: \n -> '
          + e + '\n'
          + 'Complete server response: \n -->'
          + response
        );
    }
}

$( document ).ready(function() {
    inicializarEventosLogin();
});