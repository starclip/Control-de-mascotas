// Función que va a base de datos trae las citas del día de hoy y crea el html cargandolo en la página.
function obtenerCitasBaseDatos(){
    // Obtiene los clientes para bases de datos.
    var url = "/Clientes/ObtenerLista";
    $.ajax({
        url: url,  
        type:'GET', 
        dataType: "json",
        contentType: "application/json",
        success: function(data, status){ 
            pintarClientes(data);
        },
        error: imprimirError
    })

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

// Función que va a crear un objeto de Jquery con el código html.
function pintarClientes(listaClientes){

    var datosPintar;
    debugger;

    for(var i = 0; i < listaClientes.length; i++){
        datosPintar = listaClientes[i];

        
        var Fila =$("<tr>");

        var listaNombre = $("<td>");
        listaNombre.text(datosPintar.Nombre);
            
        var listaCedulas = $("<td>");
        listaCedulas.text(datosPintar.Cedula);

        var listaTelefonos = $("<td>");
        listaTelefonos.text(datosPintar.Telefono);
       
        var listaCorreos = $("<td>");
        listaCorreos.text(datosPintar.Correo);

        var listaMascotas = $("<td>");
        listaMascotas.text(datosPintar.MascotasAsociadas);
   
        var listaDireccion = $("<td>");
        listaDireccion.text(datosPintar.Direccion);
        
        var listaIds = $("<td>",{
            style: "display:none",
            text: datosPintar.id
        });
     
        Fila.append(listaNombre);
        Fila.append(listaCedulas);
        Fila.append(listaTelefonos);
        Fila.append(listaCorreos);
        Fila.append(listaMascotas);
        Fila.append(listaDireccion);
        Fila.append(listaIds);
        $("#TablaCuerpo").append(Fila);
    }
}

$( document ).ready(function() {
    obtenerCitasBaseDatos();
});
