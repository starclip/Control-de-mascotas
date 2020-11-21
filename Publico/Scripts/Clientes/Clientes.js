// Función que va a base de datos trae las citas del día de hoy y crea el html cargandolo en la página.
function obtenerCitasBaseDatos(){

    var datos = [{ Nombre:"Jason de jesus",Cedula:"115784647",Telefono:"222458787", Correo:"ElChata@gmail.com", MascotasAsociadas:"Sho, vivi", Direccion:"Hatillos", Id:"1"},
    { Nombre:"Samantha Mendoza",Cedula:"115778899",Telefono:"222878787", Correo:"samyprlt@gmail.com", MascotasAsociadas:"Riley", Direccion:"HSan diego",Id:"1"},
    { Nombre:"Sergio",Cedula:"1123123123",Telefono:"87430505", Correo:"sergio@gmail.com", MascotasAsociadas:"Holly", Direccion:"Tres ríos",Id:"1"}  ]

    pintarClientes(datos);
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
