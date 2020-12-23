// Función que define los eventos que van a suceder cuando un usuario presione un botón.
function definirEventos(){

    // Evento que se ejecuta cuando se cargue el contenido del modal.
    $('#ModalAgregarCita').on('show.bs.modal', function(e) {
        var reference_tag = $(e.relatedTarget); 
        var id = reference_tag.attr("id");

        // Decide si trae la información de la base de datos dependiendo de la acción realizada por el usuario.
        configurarModal(id);

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
}

// Función que obtiene los datos específicos de un registro.
function obtenerCitaEspecifica(){
    var elementoSeleccionado = $(".card.active");
    var idCita = $(elementoSeleccionado).find("#idCita").val();
    debugger;
    var url = "/Citas/Obtener";
    $.ajax({  
        url: url,  
        type:'POST', 
        dataType: "json",
        data: { "IdCita": idCita },
        contentType: "application/x-www-form-urlencoded",
        success: function(data, status){  
            // Cargar los datos específicos del registro.
            debugger;
        },
        error: imprimirError
    });  
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
        $("input[name='Cedula']").removeAttr('disabled', 'disabled');
        $("input[name='Propietario']").attr('disabled', 'disabled');
        $("input[name='Mascota']").attr('disabled', 'disabled');
        $("input[name='Telefono']").attr('disabled', 'disabled');
        $("input[name='Hora']").attr('disabled', 'disabled');
        $("input[name='Fecha']").attr('disabled', 'disabled');
    }else{
        $("input[name='Cedula']").attr('disabled', 'disabled');
        $("input[name='Propietario']").attr('disabled', 'disabled');
        $("input[name='Mascota']").attr('disabled', 'disabled');
        $("input[name='Telefono']").removeAttr('disabled', 'disabled');
        $("input[name='Hora']").removeAttr('disabled', 'disabled');
        $("input[name='Fecha']").removeAttr('disabled', 'disabled');
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