
// Función que va a base de datos trae las citas del día de hoy y crea el html cargandolo en la página.
function cargarCita(){

    var listaCitas = obtenerCitasBaseDatos();
    pintarCitas(listaCitas);
}

function obtenerCitasBaseDatos(){
    // Obtiene las citas para bases de datos.
    var listaCitas = [];
    
    listaCitas[0] = { 
        "IdCita": 1, 
        "IdMascota":5, 
        "NombreMascota": "Riley", 
        "Fecha": new Date(), 
        "IdCliente": 6,
        "NombreCliente": "Samantha",
        "Telefono": "2214-0101",
        "Foto": "riley.jpg"  
    }

    listaCitas[1] = { 
        "IdCita": 2, 
        "IdMascota":1, 
        "NombreMascota": "Koneka", 
        "Fecha": new Date(), 
        "IdCliente": 6,
        "NombreCliente": "Samantha",
        "Telefono": "2214-0101",
        "Foto": "koneka.jpg" 
    }

    listaCitas[2] = { 
        "IdCita": 3, 
        "IdMascota":6, 
        "NombreMascota": "Sho", 
        "Fecha": new Date(), 
        "IdCliente": 7,
        "NombreCliente": "Jason",
        "Telefono": "2214-0909",
        "Foto": undefined 
    }

    return listaCitas;
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

        var fechaObtenida = datosPintar.Fecha;
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
        parrafo.append(datosPintar.NombreCliente)

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

$( document ).ready(function() {
    cargarCita();
});