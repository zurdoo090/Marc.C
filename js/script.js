function calcularPresupuesto() {
    var extras = 0;
    var presupuesto = 0;

    if (document.getElementById("producto1").checked) {
        presupuesto += 100;
    }

    if (document.getElementById("producto2").checked) {
        presupuesto += 150;
    }

    if (document.getElementById("producto3").checked) {
        presupuesto += 200;
    }

    if (document.getElementById("extra1").checked) {
        extras += 50;
    }

    if (document.getElementById("extra2").checked) {
        extras += 75;
    }

    if (document.getElementById("extra3").checked) {
        extras += 100;
    }

    presupuesto += extras;
    //presupuesto = (precioProducto1 + precioProducto2 + precioProducto3 + extras) * plazo;
    document.getElementById("presupuesto-final").innerText = "Presupuesto Final: $" + presupuesto;
}
function limpiarPresupuesto() {
    document.getElementById("presupuesto-final").innerText = "Presupuesto Final: $0";
}

function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;

    if (nombre === '' || email === '' || apellidos === '' || telefono === '' || !document.getElementById("aceptar-condiciones").checked) {
        alert('No se ha podido enviar el presupuesto. \nPor favor, completa todos los campos, incluido aceptar las condiciones de privacidad.');
        return false; 
    }
    alert('Se ha enviado el presupuesto correctamente.');
    return true; 
}

function initMap() {
    var map = L.map('map').setView([0, 0], 13);

    // Utilizar el proveedor de mapas OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLocation = [position.coords.latitude, position.coords.longitude];

            // Colocar un marcador en la ubicación del usuario
            /*L.marker(userLocation).addTo(map)
                .bindPopup('Tu Ubicación').openPopup();*/

            // Calcular la ruta desde la ubicación del usuario a un destino (puedes cambiar las coordenadas)
            var destination = [41.38798725359526, 2.1975107259925934]; // Times Square, Nueva York

            L.Routing.control({
                waypoints: [
                    L.latLng(userLocation[0], userLocation[1]),
                    L.latLng(destination[0], destination[1])
                ],
                routeWhileDragging: true
            }).addTo(map);

        }, function() {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // El navegador no soporta la geolocalización
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    var map = L.map('map').setView(pos, 13);

    // Utilizar el proveedor de mapas OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var popupContent = browserHasGeolocation ?
        'Error: La geolocalización ha fallado.' :
        'Error: Tu navegador no soporta la geolocalización.';

    L.popup()
        .setLatLng(pos)
        .setContent(popupContent)
        .openOn(map);
}

// Llama a la función initMap cuando la página se carga
window.onload = initMap;