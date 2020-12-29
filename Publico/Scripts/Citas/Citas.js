// Función que define los eventos que van a suceder cuando un usuario presione un botón.
function definirEventos(){

    // Evento que se ejecuta cuando se cargue el contenido del modal.
    $('#ModalAgregarCita').on('show.bs.modal', function(e) {
        var reference_tag = $(e.relatedTarget); 
        var id = reference_tag.attr("id");

        // Decide si trae la información de la base de datos dependiendo de la acción realizada por el usuario.
        configurarModal(id);
        limpiarDatosCliente();

        // Traer la información de la base de datos.
        if (id == "Editar"){
            obtenerCitaEspecifica();
        }
    });

    $("#formularioCitas").on("submit", function(e){
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var datos = $(this).serialize();
        var url = "/Citas/Guardar";

        $.ajax({  
            url: url,  
            type:'POST', 
            dataType: "json",
            data: datos,
            contentType: "application/x-www-form-urlencoded",
            success: function(data, status){  
                console.log('message', data.message);
            },
            error: imprimirError
        });  
    });

    // Evento que se ejecuta cuando la persona presiona guardar en el modal.
    $("#Guardar").on('click', function(e) {
        $("#formularioCitas").trigger("submit");
    });

    $("#botoncedula").on('click', function(evento){
        var cedula = $("input[name='Cedula']").val();

        buscarPersona(cedula);
    });
}

// Función que obtiene los datos específicos de un registro.
function obtenerCitaEspecifica(){
    var elementoSeleccionado = $(".card.active");
    var idCita = $(elementoSeleccionado).find("#idCita").val();
    var url = "/Citas/Obtener";
    $.ajax({  
        url: url,  
        type:'POST', 
        dataType: "json",
        data: { "IdCita": idCita },
        contentType: "application/x-www-form-urlencoded",
        success: function(data, status){  
            // Cargar los datos específicos del registro.
            recargarDatosCliente(data);
        },
        error: imprimirError
    });  
}

// Función que recarga los datos del cliente seleccionados.
function recargarDatosCliente(datos){

    var fecha = new Date(datos.fecha);
    var dia = fecha.getDay() > 9 ? fecha.getDay() : "0" + fecha.getDay();
    var mes = fecha.getMonth() > 9 ? fecha.getMonth() : "0" + fecha.getMonth();
    var fechaFormato = fecha.getFullYear() + "-" + mes + "-" + dia;

    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    var tiempoFormato = horas + ":" + minutos + ":" + segundos;

    $("input[name='IdCita'").val(datos.idCita);
    $("input[name='IdMascota'").val(datos.idMascota);
    $("input[name='IdCliente'").val(datos.idCliente);
    $("input[name='IdVeterinario'").val(datos.idVeterinario);
    $("input[name='Cedula']").val(datos.cedula);
    $("input[name='Propietario']").val(datos.propietario);
    $("button[name='Mascota']").text(datos.nombreMascota);
    $("input[name='Telefono']").val(datos.telefono);
    $("input[name='Hora']").val(tiempoFormato);
    $("input[name='Fecha']").val(fechaFormato);
}

// Función que recarga el modal en caso de que se vaya a agregar alguien nuevo.
function limpiarDatosCliente(){

    $("input[name='IdCita'").val(-1);
    $("input[name='IdMascota'").val(-1);
    $("input[name='IdCliente'").val(-1);
    $("input[name='IdVeterinario'").val(-1);
    $("input[name='Cedula']").val("");
    $("input[name='Propietario']").val("");
    $("button[name='Mascota']").val("");
    $("input[name='Telefono']").val("");
    $("input[name='Hora']").val("");
    $("input[name='Fecha']").val("");
}

// Función que va a base de datos trae las citas del día de hoy y crea el html cargandolo en la página.
function obtenerCitasBaseDatos(){

    // Obtiene las citas para bases de datos.
    var url = "/Citas/ObtenerLista";

    $.ajax({  
        url: url,  
        type:'GET', 
        dataType: "json",
        contentType: "application/json",
        success: function(data, status){ 
            pintarCitas(data);
        },
        error: imprimirError
    });  
}

// Función para buscar la información de una persona.
function buscarPersona(cedula){
    if (cedula == undefined || cedula == "" || cedula == null){
        alert("Debe ingresar una cédula");
        return;
    }

    var url = "/Citas/ObtenerDatosCedula";
    $.ajax({  
        url: url,  
        type:'POST', 
        dataType: "json",
        data: { "Cedula": cedula },
        contentType: "application/x-www-form-urlencoded",
        success: function(data, status){  
            cargarDatosCedula(data);
            habilitarDatosCedula();
        },
        error: imprimirError
    });  
}

// Cargar página con datos de la cédula.
function cargarDatosCedula(datos){
    var listaNombreMascotas = datos.NombreMascotas ? datos.NombreMascotas.split(',') : [];
    var listaIdMascotas = datos.IdMascotas ? datos.IdMascotas.split(',') : [];
    var nombre, id;

    /* Se crea el html del drop down de bootstrap */
    if (listaNombreMascotas.length == 0)
        $("#botonListaMascotas").text("");
    else
        $("#botonListaMascotas").text(listaNombreMascotas[0]);

    if (listaNombreMascotas.length > 1)
        $("#botonListaMascotas").addClass("dropdown-toggle");
    
    /* Vacío la lista de mascotas. */
    $(".dropdown").find(".dropdown-item").remove();

    /* Agrego los elementos a la lista. */
    for(var i = 0; i < listaIdMascotas.length; i++){
        nombre = listaNombreMascotas[i];
        id = listaIdMascotas[i];

        var mascota = $("<button>", {
            class: "dropdown-item", 
            type: "button",
            id: "opcionMascota_" + id,
            value: id
        });

        mascota.text(nombre);

        mascota.on('click', function(e){
            var nombre = $(this).text();
            var id = $(this).attr('id');
            $("#botonListaMascotas").text(nombre);
            $("input[name='IdMascota']").val(id);
        });

        // Agreguelo a la lista de mascotas disponibles.
        $("#listaMascotas").append(mascota);
    }

    $("input[name='Propietario']").val(datos.Propietario);
    $("input[name='Telefono']").val(datos.Telefono);
    $("input[name='IdCliente']").val(datos.IdCliente);
}

// Función que habilita los campos una vez ingresada la cedula.
function habilitarDatosCedula(){
    $("button[name='Mascota']").removeAttr('disabled', 'disabled');
    $("input[name='Telefono']").removeAttr('disabled', 'disabled');
    $("input[name='Hora']").removeAttr('disabled', 'disabled');
    $("input[name='Fecha']").removeAttr('disabled', 'disabled');
}

// Obtener el formato de la fecha.
function obtenerFormatoFecha (fecha){
    var horaFinal = "";
    var formato = "am";
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();

    // Si los minutos son inferiores a 10.
    if (minutos < 10)
        minutos = "0" + minutos;
    
    // Si las horas superan el formato.
    if (horas > 12){
        horas = horas - 12;
        formato = "pm";
    }

    horaFinal = horas + ":" + minutos + " " + formato;
    return horaFinal;
}

// Función que va a crear un objeto de Jquery con el código html.
function pintarCitas(listaCitas){

    var datosPintar;

    for(var i = 0; i < listaCitas.length; i++){
        datosPintar = listaCitas[i];

        var contenedor = $("<div>",{ 
            class: "row"
        });
        
        var columnaContenedor = $("<div>", {
            class: "col-md-12"
        });

        // Habría que crear el card.
        var contenedorCard = $("<div>", {
            class: "card"
        });

        contenedorCard.on("mouseenter", entrarCard);

        contenedorCard.on("mouseleave", salirCard);

        contenedorCard.on("click", seleccionarCard);

        var rowCardBody = $("<div>", {
            class: "row card-body"
        });

        var colSm6 = $("<div>", {
            class: "col-sm-9"
        });

        // Creo el card. Todo el card se inserta en colSm6.

        // Se inserta la fecha y el nombre de la mascota.
        var fechaObtenida = new Date(datosPintar.Fecha);
        var hora = obtenerFormatoFecha(fechaObtenida);
        
        var filaTituloCard = $("<div>", {
           class: "row" 
        });

        var columnaTituloCard = $("<div>", {
            class: "col-sm-6"
        });

        var columnaTituloMascota = $("<div>", {
            class: "col-sm-6"
        });

        var tituloh5 = $("<h5>", {
            class: "card-title"
        });

        var horaTexto = $("<strong>");
        horaTexto.text("Hora: ");
        tituloh5.append(horaTexto);
        tituloh5.append(hora);

        var nombreMascota = $("<h5>", {
            text: datosPintar.NombreMascota
        });

        // Se inserta el texto del responsable de la mascota.

        var tituloResponsable = $("<strong>"); 
        tituloResponsable.text("Responsable: ");

        var parrafo = $("<p>", {
            class: "card-text",
        });
        parrafo.append(tituloResponsable);
        parrafo.append(datosPintar.Propietario)

        // Se inserta el texto del teléfono del responsable.

        var tituloTelefono = $("<strong>"); 
        tituloTelefono.text("Telefono: ");

        var telefonoCard = $("<p>", {
            class: "card-text"
        });
        telefonoCard.append(tituloTelefono);
        telefonoCard.append(datosPintar.Telefono);

        // Se inserta el texto del veterinario encargado de la cita.

        var tituloVeterinario = $("<strong>");
        tituloVeterinario.text("Veterinario: ");

        var veterinarioCard = $("<p>", {
            class: "card-text"
        });
        veterinarioCard.append(tituloVeterinario);
        veterinarioCard.append(datosPintar.Veterinario);

        // Se inserta la imagen.

        var imagen = $("<img>", {
            class: "imageCard col-sm-2",
            alt:"Mascota",
            src: "../Imagenes//"+(datosPintar.Foto ? datosPintar.Foto : "defecto.jpg")
        });

        var inputIdCita = $("<input>", {
            type: "hidden",
            id: "idCita",
            value: datosPintar.IdCita
        });

        
        columnaTituloCard.append(tituloh5);
        columnaTituloMascota.append(nombreMascota);
        filaTituloCard.append(columnaTituloCard);
        filaTituloCard.append(columnaTituloMascota);

        colSm6.append(filaTituloCard);
        colSm6.append(parrafo);
        colSm6.append(telefonoCard);
        colSm6.append(veterinarioCard);
        colSm6.append(inputIdCita);

        rowCardBody.append(colSm6);
        rowCardBody.append(imagen);

        contenedorCard.append(rowCardBody);
        columnaContenedor.append(contenedorCard);
        contenedor.append(columnaContenedor);
        $("#columnaContenedoraCitas").append(contenedor);
    }
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

// Función que permite habilitar los campos a la hora de abrir o cerrar un modal.
function configurarModal(evento){

    if (evento == 'Agregar')
    {
        $("#exampleModalLabel").text("Agregar nueva cita");
        $("input[name='Cedula']").removeAttr('disabled', 'disabled');
        $("input[name='Propietario']").attr('disabled', 'disabled');
        $("button[name='Mascota']").attr('disabled', 'disabled');
        $("input[name='Telefono']").attr('disabled', 'disabled');
        $("input[name='Hora']").attr('disabled', 'disabled');
        $("input[name='Fecha']").attr('disabled', 'disabled');
        $("#botoncedula").removeAttr('disabled', 'disabled');
    }else{
        $("#exampleModalLabel").text("Editar una cita");
        $("input[name='Cedula']").attr('disabled', 'disabled');
        $("input[name='Propietario']").attr('disabled', 'disabled');
        $("button[name='Mascota']").attr('disabled', 'disabled');
        $("input[name='Telefono']").removeAttr('disabled', 'disabled');
        $("input[name='Hora']").removeAttr('disabled', 'disabled');
        $("input[name='Fecha']").removeAttr('disabled', 'disabled');
        $("#botoncedula").attr('disabled', 'disabled');
    }
}

// Función que se ejecuta cuando se selecciona un registro de la lista.
function seleccionarCard(evento){
    var esIgual = false;
    var listaClasesActive = $(".card.active");
    var idSeleccionado = $(this).find("#idCita").val();
    var idTemporal = 0;

    for(var i = 0; i < listaClasesActive.length; i++){
        idTemporal = $(listaClasesActive[i]).find("#idCita").val();
        if (idSeleccionado == idTemporal){
            esIgual = true;
        }

        // Convierta a blanco los campos que anteriormente fueron seleccionados.
        $(listaClasesActive[i]).removeClass("active");
        $(listaClasesActive[i]).css({ "background-color": "white", "cursor": "auto" });
    }

    // Si es el mismo registro es el que se está seleccionando nuevamente. Si no, se selecciona.
    if (esIgual){
        $(this).removeClass("active");
        $("#Editar").attr('disabled', 'disabled');
        $("#Eliminar").attr('disabled', 'disabled');
    }
    else{
        $(this).addClass("active");
        $("#Editar").removeAttr('disabled', 'disabled');
        $("#Eliminar").removeAttr('disabled', 'disabled');
    }
}

// Función que se ejecuta cuando se pasa el mouse por encima de un elemento.
function entrarCard(evento){
    var listaClases = $(this).attr('class').split(' ');
    var estaIncluido = false;
    var clase;
    for(var i = 0; i < listaClases.length; i++){
        clase = listaClases[i];
        if (clase == 'active')
            estaIncluido = true;
    }

    if (!estaIncluido)
        $(this).css({ "background-color": "#A19C9B", "cursor": "pointer" });
}

// Función que se ejecuta cuando se sale del mouse en un elemento.
function salirCard(evento){
    var listaClases = $(this).attr('class').split(' ');
    var estaIncluido = false;
    var clase;
    for(var i = 0; i < listaClases.length; i++){
        clase = listaClases[i];
        if (clase == 'active')
            estaIncluido = true;
    }

    if (!estaIncluido)
        $(this).css({ "background-color": "white", "cursor": "auto" });
}

$( document ).ready(function() {
    definirEventos();
    obtenerCitasBaseDatos();
});