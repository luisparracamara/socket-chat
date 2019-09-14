const { io } = require('../server');
const {Usuarios} = require("../classes/usuarios");
const{crearMensaje} = require("../utilidades/utilidades");

const usuarios = new Usuarios();



io.on('connection', (client) => {

    //CONECTARSE AL CHAT
    client.on("entrarChat", (data, callback) => {
        
            if (!data.nombre || !data.sala) {
                return callback({
                    error: true,
                    mensaje: 'El nombre/sala es necesario'
                });
            }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        
        //mostrar lista de personas
        client.broadcast.to(data.sala).emit("listaPersona", usuarios.getPersonasPorSala(data.sala));

        //retornar
        callback(usuarios.getPersonasPorSala(data.sala)); 
    });



    //CREAR MENSAJE
    client.on("crearMensaje", (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(data.sala).emit("listaPersona", usuarios.getPersonas());

        // client.broadcast.emit("crearMensaje", mensaje);
    })


    //DESCONECTARSE DEL CHAT
    client.on("disconnect", function() { 

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit("crearMensaje", crearMensaje("administrador", `${personaBorrada.nombre} salió`))
        client.broadcast.to(personaBorrada.sala).emit("listaPersona", usuarios.getPersonasPorSala(personaBorrada.sala)); 

        //mostrar lista de personas
        // client.broadcast.emit("listaPersona", usuarios.getPersonas());
     })



    //ENVIAR MENSAJES PRIVADOS a una persona
    client.on("mensajePrivado", data => {

        let persona = usuarios.getPersona(client.id);

        //enviar a alguien por id
        client.broadcast.to(data.para).emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
    });



   
});





////VIDEO 195, ENVIAR MENSAJE A USUARIO ESPECIFICO