function copiarTextoEncriptado() {
    var textoEncriptado = document.getElementById("textoEncriptado").value.trim();

    if (textoEncriptado === "") {
        mostrarOverlayNoTextoParaCopiar();
        return;
    }

    // Copiar el texto seleccionado
    navigator.clipboard.writeText(textoEncriptado)
        .then(function() {
            // Limpiar las cajas de texto después de copiar
            limpiarCampos();
        })
        .catch(function(err) {
            console.error('Error al copiar texto: ', err);
        });

    // Compartir el texto encriptado en dispositivos móviles
    compartirTextoEncriptado(textoEncriptado);
}

function compartirTextoEncriptado(texto) {
    if (esDispositivoMovil()) {
        compartirEnDispositivoMovil(texto);
    }
}

function esDispositivoMovil() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function compartirEnDispositivoMovil(texto) {
    var urlCompartirWhatsApp = 'whatsapp://send?text=' + encodeURIComponent(texto);
    var urlCompartirMessenger = 'fb-messenger://share/?link=' + encodeURIComponent(texto);
    
    // Intentar abrir WhatsApp
    window.location.href = urlCompartirWhatsApp;

    // Intentar abrir Messenger
    setTimeout(function() {
        window.location.href = urlCompartirMessenger;
    }, 3000); // Después de 3 segundos, intenta abrir Messenger
}

function limpiarCampos() {
    // Limpiar caja de salida y caja de entrada
    document.getElementById("textoEncriptado").value = "";
    document.getElementById("textoDesencriptado").value = "";
    // Ocultar la imagen después de limpiar
    ocultarImagenConMensaje();
}

function mostrarOverlayNoTextoParaCopiar() {
    var overlayNoTextoParaCopiar = document.getElementById("overlay-no-texto-para-copiar");
    overlayNoTextoParaCopiar.style.display = "block";
}

function ocultarOverlayNoTextoParaCopiar() {
    var overlayNoTextoParaCopiar = document.getElementById("overlay-no-texto-para-copiar");
    overlayNoTextoParaCopiar.style.display = "none";
}

function encriptar() {
    var entrada = document.getElementById("textoDesencriptado").value.trim();
    var output = "";

    if (entrada === "") {
        mostrarOverlay("Por favor ingresa un texto para ser encriptado");
        return;
    }

    for (var i = 0; i < entrada.length; i++) {
        switch (entrada[i]) {
            case 'e':
                output += "enter";
                break;
            case 'i':
                output += "imes";
                break;
            case 'a':
                output += "ai";
                break;
            case 'o':
                output += "ober";
                break;
            case 'u':
                output += "ufat";
                break;
            default:
                output += entrada[i];
        }
    }

    document.getElementById("textoEncriptado").value = output;
    // Limpiar la caja de entrada después de encriptar
    document.getElementById("textoDesencriptado").value = "";
}

function mostrarOverlay(mensaje) {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    // Mostrar la imagen de advertencia personalizada y el mensaje
    var overlayContent = document.querySelector(".overlay-content");
    overlayContent.innerHTML = `
        <img src="imagenes/imagen_error.png" alt="Mensaje de advertencia">
        <p>${mensaje}</p>
        <span class="close-btn" onclick="ocultarOverlay()">&times;</span>
    `;
}

function ocultarOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

function desencriptar() {
    var entrada = document.getElementById("textoEncriptado").value.trim();

    if (entrada === "") {
        mostrarOverlay("Lo sentimos, no tienes nada para desencriptar");
        return;
    }

    var textoDesencriptado = desencriptarTextoPersonalizado(entrada);

    document.getElementById("textoDesencriptado").value = textoDesencriptado;
}

function desencriptarTextoPersonalizado(textoEncriptado) {
    var sustituciones = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u"
    };

    var desencriptarTexto = function(texto) {
        return texto.replace(/enter|imes|ai|ober|ufat/g, function(matched) {
            return sustituciones[matched];
        });
    };

    return desencriptarTexto(textoEncriptado);
}



