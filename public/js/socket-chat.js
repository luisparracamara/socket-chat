var socket = io();

////////////////////
//  EMIT EMITE Y ON ESCUCHA
//////////////////////////


// para leer el nombre de usuario de la url, el valor de la url se pone en automatico segun el name de la etiqueta
var params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala") ) {
    window.location = "index.html";
    throw new Error("El nombre y sala son necesarios");   
}

//guardar los datos del url
var usuario = {
    nombre: params.get("nombre"),
    sala: params.get("sala")
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit("entrarChat", usuario, function(resp) {
        console.log("Usuarios conectados " , resp);
        
    })
});


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});


// Escuchar información de mensaje creado
socket.on('crearMensaje', function(mensaje) {

    console.log('MENSAJE:', mensaje);

});

//ESCUCHAR CAMBIOS DE USUARIOS, CUANDO UN USUARIO ENTRA O SALE DEL CHAT
socket.on('listaPersona', function (personas) {

    console.log(personas);

});


// ESCUCHAR MESNAJES PRIVADORS
socket.on("mensajePrivado", function(mensaje) {
    console.log("mensaje privado:", mensaje);
    
});