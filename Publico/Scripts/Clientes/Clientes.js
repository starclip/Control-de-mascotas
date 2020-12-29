
// Función que define los eventos que van a suceder cuando un usuario presione un botón.
function definirEventos(){

    // Evento que se ejecuta cuando se cargue el contenido del modal.
    $('#ModalAgregarCliente').on('show.bs.modal', function(e) {
        var reference_tag = $(e.relatedTarget); 
        var id = reference_tag.attr("id");
        debugger;

        // Decide si trae la información de la base de datos dependiendo de la acción realizada por el usuario.
       
        configurarModal(id);

       // Traer la información de la base de datos.
       if (id == "Editar"){
            obtenerClienteEspecifico();
        }
    });

    $("#formularioClientes").on("submit", function(e){
        e.preventDefault(); // avoid to execute the actual submit of the form.

        var datos = $(this).serialize();
        var url = "/Clientes/Guardar";

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
        $("#formularioClientes").trigger("submit");
    });
}

function obtenerClienteEspecifico()
{
    var elementoSeleccionado = $("tr.active");
    var idCliente = $(elementoSeleccionado).find("#idCliente").attr("value");
    debugger;
    /*
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
    */
}







// Función que va a base de datos trae los cliente regristrados y crea el html cargandolo en la página.
function obtenerClientesBaseDatos(){
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
    debugger;
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

function configurarModal(evento){
    if (evento == 'Agregar')
    {
        $("#exampleModalLabel").text("Agregar cliente");
    }else{
        $("#exampleModalLabel").text("Editar cliente");
    }
}

function seleccionar(evento){
    var esIgual = false;
    var listaClasesActive = $("tr.active");
    var idSeleccionado = $(this).attr("id");
    var idTemporal = 0;

    for(var i =0; i < listaClasesActive.length; i++){
        idTemporal= $(listaClasesActive[i]).attr("id");
        if(idSeleccionado == idTemporal)
        {
            esIgual = true;
        }
        $(listaClasesActive[i]).removeClass("active");
    }
    if (!esIgual) {
        $(this).addClass("active");
    }
    else{
        $(this).removeClass("active");
    }
}

// Función que va a crear un objeto de Jquery con el código html. Usamos los campos del
// del procedimiento ObtenerClientes()
function pintarClientes(listaClientes){

    var datosPintar;


    for(var i = 0; i < listaClientes.length; i++){
        datosPintar = listaClientes[i];

        
        var Fila =$("<tr>", {
            id: i + 1
        });
        Fila.on("click",seleccionar);

        var listaNombre = $("<td>");
        listaNombre.text(datosPintar.Nombre);

        var listaApellido = $("<td>");
        listaApellido.text(datosPintar.Apellido);
        
        var listaCedulas = $("<td>");
        listaCedulas.text(datosPintar.Cedula);

        var listaTelefonos = $("<td>");
        listaTelefonos.text(datosPintar.Telefono);
       
        var listaCorreos = $("<td>");
        listaCorreos.text(datosPintar.Correo);

        var listaMascotas = $("<td>");
        listaMascotas.text(datosPintar.Mascota);
   
        var listaDireccion = $("<td>");
        listaDireccion.text(datosPintar.Direccion);
        
        var listaIds = $("<td>",{
            id:"idCliente",
            style: "display:none",
            value: datosPintar.IdCliente
        });
     
        Fila.append(listaNombre);
        Fila.append(listaApellido);
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
    definirEventos();
    obtenerClientesBaseDatos();
});
