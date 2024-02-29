// Función para desencriptar el texto
function desencriptar() {
    var entrada = document.getElementById("textoEncriptado").value.trim();
    var output = "";

    // Verificar si el campo de entrada está vacío
    if (entrada === "") {
        mostrarOverlay("Por favor, ingresa un texto encriptado.");
        return;
    }

    // Verificar si el texto está encriptado
    if (!isEncriptado(entrada)) {
        mostrarOverlay("Lo sentimos el texto que ingresaste no esta encriptado");
        limpiarCajaEntrada(); // Llama a la función para limpiar la caja de entrada
        return;
    }

    // Objeto con las sustituciones de letras
    var sustituciones = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u"
    };

    // Realizar las sustituciones en el texto de entrada
    output = entrada.replace(/enter|imes|ai|ober|ufat/g, function(matched) {
        return sustituciones[matched];
    });

    // Mostrar el texto desencriptado en el campo correspondiente
    document.getElementById("textoDesencriptado").value = output;
}

// Función para verificar si el texto está encriptado
function isEncriptado(text) {
    // Verificar si el texto contiene alguna de las secuencias de letras encriptadas
    if (text.toLowerCase().includes("enter") || 
        text.toLowerCase().includes("imes") || 
        text.toLowerCase().includes("ai") || 
        text.toLowerCase().includes("ober") || 
        text.toLowerCase().includes("ufat")) {
        return true; // El texto está encriptado
    } else {
        return false; // El texto no está encriptado
    }
}

// Función para mostrar un overlay con un mensaje
function mostrarOverlay(mensaje) {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    document.getElementById("overlay-text").textContent = mensaje;
}

// Función para ocultar el overlay
function ocultarOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

// Función para limpiar la caja de entrada
function limpiarCajaEntrada() {
    document.getElementById("textoEncriptado").value = ""; // Limpia el valor del campo de entrada
}

// Función para copiar el texto desencriptado al portapapeles
function copiarTexto() {
    var textoDesencriptado = document.getElementById("textoDesencriptado").value.trim();

    // Verificar si el texto desencriptado está vacío
    if (textoDesencriptado === "") {
        mostrarOverlay("Disculpa, no tienes nada por copiar en tu portapapeles.");
        return;
    }

    // Intentar copiar el texto al portapapeles
    navigator.clipboard.writeText(textoDesencriptado)
        .then(() => {
            var overlayImagen = document.getElementById("overlayImagen");
            var imagen = overlayImagen.querySelector("img");
            var mensaje = overlayImagen.querySelector("p");

            imagen.src = "Imagenes/muñeco2.png"; // Ruta de la imagen que quieres mostrar
            mensaje.textContent = "¡Se copió tu texto satisfactoriamente!"; // Texto que quieres mostrar

            overlayImagen.style.display = "flex";

            setTimeout(function() {
                overlayImagen.style.display = "none";
            }, 2000); // Ocultar el overlay después de 2 segundos

            // Limpiar las cajas de entrada y salida
            document.getElementById("textoEncriptado").value = "";
            document.getElementById("textoDesencriptado").value = "";
        })
        .catch((error) => console.error("Error al copiar el texto:", error));
}

// Agregar evento de clic al botón de cierre del overlay
document.getElementById("closeButton").addEventListener("click", function() {
    ocultarOverlay();
});

// Función para cerrar el overlay
function cerrarOverlay(overlayId) {
    var overlay = document.getElementById(overlayId);
    overlay.style.display = "none";
}

// Agregar eventos de clic a los botones de cierre de los overlays
document.getElementById("closeButtonImagen").addEventListener("click", function() {
    cerrarOverlay("overlayImagen");
});



