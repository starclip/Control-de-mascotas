// Función que define los eventos que van a suceder cuando un usuario presione un botón.
function definirEventos(){

    // Evento que se ejecuta cuando se cargue el contenido del modal.
    $('#ModalAgregarCita').on('show.bs.modal', function(e) {
        var reference_tag = $(e.relatedTarget); 
        var id = reference_tag.data('id');

        // Decide si trae la información de la base de datos dependiendo de la acción realizada por el usuario.
    });

    $("#formularioCitas").on("submit", function(e){
        e.preventDefault(); // avoid to execute the actual submit of the form.

        debugger;
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
            error: function(xhr) {
                try {
                  var response = JSON.parse(xhr.responseText);
                  console.log('Success');
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
        });  
    });

    // Evento que se ejecuta cuando la persona presiona guardar en el modal.
    $("#Guardar").on('click', function(e) {
        $("#formularioCitas").trigger("submit");
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

        //debugger;
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

        var rowCardBody = $("<div>", {
            class: "row card-body"
        });

        var colSm6 = $("<div>", {
            class: "col-sm-9"
        });

        var fechaObtenida = new Date(datosPintar.Fecha);
        var hora = obtenerFormatoFecha(fechaObtenida);
        
        var tituloh5 = $("<h5>", {
            class: "card-title",
            text: "Hora: " + hora
        });

        var tituloResponsable = $("<strong>"); 
        tituloResponsable.text("Responsable: ");

        var parrafo = $("<p>", {
            class: "card-text",
        });
        parrafo.append(tituloResponsable);
        parrafo.append(datosPintar.Propietario)

        var tituloTelefono = $("<strong>"); 
        tituloTelefono.text("Telefono: ");

        var telefonoCard = $("<p>", {
            class: "text-telefono"
        });
        telefonoCard.append(tituloTelefono);
        telefonoCard.append(datosPintar.Telefono);

        
        var imagen = $("<img>", {
            class: "imageCard col-sm-2",
            alt:"Mascota",
            src: "../Imagenes//"+(datosPintar.Foto ? datosPintar.Foto : "defecto.jpg")
        });

        colSm6.append(tituloh5);
        colSm6.append(parrafo);
        colSm6.append(telefonoCard);

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

$( document ).ready(function() {
    definirEventos();
    obtenerCitasBaseDatos();
});