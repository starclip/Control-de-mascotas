var general = General();

function General(parametros) {
    
    var ref = this;
    ref.clasesHeaderError = {
        "1": "tituloInfoHeader",
        "2": "tituloAdvertenciaHeader",
        "3": "tituloErrorHeader",
        "4": "tituloExitoHeader"
    };

    ref.iconos = {
        "1": "fas fa-exclamation",
        "2": "fas fa-exclamation-triangle",
        "3": "fas fa-exclamation-circle",
        "4": "fas fa-exclamation"
    }

    ref.claseIconos = {
        "1": "iconoInformacion",
        "2": "iconoAdvertencia",
        "3": "iconoError",
        "4": "iconoExito"
    }

    ref.mensajeTitular = {
        "1" : "Información",
        "2" : "¡Advertencia!",
        "3" : "¡Error!",
        "4" : "¡Éxito!"
    }

    ref.clasesBotones = {
        "1" : "btn btn-primary",
        "2" : "btn btn-warning",
        "3" : "btn btn-danger",
        "4" : "btn btn-success"
    };

    ref.estructuraBotonBasico = {
        "codigo": "basic",
        "estilo": "",
        "texto": "Cerrar"
    };

    this.mostrarMensaje = function(datos){

        if (datos == undefined || datos == null){
            // Se debe generar el HTML del respectivo bootstrap.
            return false;
        }

        // Elimine el modal en caso de que haya uno.
        $("#modalMensaje").remove();

        var mensaje = datos.mensaje; 
        var estado = datos.estado;
        var tipo = datos.tipo ? datos.tipo : "1";

        // Se genera el html del modal.
        var modal = $("<div>", {
            id: "modalMensaje",
            class: "modal fade show",
            "aria-modal": "true"
        });

        var estructuraModal = $("<div>", {
            class: "modal-dialog modal-confirm"
        });

        var contenidoModal = $("<div>", {
            class: "modal-content cajaHeader"
        });

        var cabeceraModal = $("<div>", {
            class: "modal-header justify-content-center " + ref.clasesHeaderError[tipo]
        });

        var caja = $("<div>", {
            class: "caja-icono"
        });

        var icono = $("<i>", {
            class: ref.claseIconos[tipo] + " " + ref.iconos[tipo]
        });

        var botonCerrar = $("<button>", {
            type: "button", 
            class: "close closeModal", 
            "data-dismiss": "modal", 
            "aria-hidden": "true"
        });

        botonCerrar.on('click', ref.cerrarMensaje);

        var cuerpoModal = $("<div>", {
            class: "modal-body text-center"
        });

        var titulo = $("<h4>", {
            text: ref.mensajeTitular[tipo]
        });

        var mensajeModal = $("<p>", {
            text: mensaje
        });

        var filaBotones = $("<div>", {
            class: "row"
        });

        var listaBotones = [];

        if (datos.botones == undefined || datos.botones == null){
            datos.botones = [ref.estructuraBotonBasico];
        }

        for(var i = 0; i < datos.botones.length; i++){
            var boton = $("<button>", {
                width: datos.botones[i].texto.length < 10 ? "90px" : "auto",
                id: datos.botones[i].codigo ? datos.botones[i].codigo : ref.estructuraBotonBasico.codigo,
                class: ref.clasesBotones[tipo],
                "data-dismiss": "modal",
                text: datos.botones[i].texto ? datos.botones[i].texto : ref.estructuraBotonBasico.texto
            });

            boton.on('click', datos.botones[i].funcion ? datos.botones[i].funcion : ref.cerrarMensaje);

            listaBotones[i] = boton;
        }

        // Se crea la estructura de la página.
        cuerpoModal.append(titulo);
        cuerpoModal.append(mensajeModal);
        cuerpoModal.append(filaBotones);

        var numero = obtenerAnchoColumnas(listaBotones.length);
        for(var i = 0; i < listaBotones.length; i++){
            var columna = $("<div>", {
                class: "col-sm-" + numero
            });

            columna.append(listaBotones[i]);
            filaBotones.append(columna);
        }

        caja.append(icono);
        cabeceraModal.append(caja);
        cabeceraModal.append(botonCerrar);

        contenidoModal.append(cabeceraModal);
        contenidoModal.append(cuerpoModal);
        estructuraModal.append(contenidoModal);
        modal.append(estructuraModal);
        
        $("body").append(modal);
        $("#modalMensaje").modal('show');

        return true;
    }

    // Función que obtiene el largo de las columnas dado un número de botones.
    function obtenerAnchoColumnas (cantidad){
        var tamano = 12 / cantidad;
        return tamano;
    }

    this.cerrarMensaje = function(){
        $("#modalMensaje").modal('hide');
        $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
        $('.modal-backdrop').remove();//eliminamos el backdrop del modal
    }

    return ref;
}