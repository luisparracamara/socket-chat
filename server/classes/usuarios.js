
class Usuarios{

    constructor() {
        this.personas = [];
        
    }

    agregarPersona(id, nombre, sala){
        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;
    }


    getPersona(id){
        //buscar por medio del id en el arreglo en la posicion 0
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];

        return persona;

    }

    getPersonas(){
        return this.personas;
    }

    borrarPersona(id){

        let personaBorrada = this.getPersona(id);

        //filter crea un nuevo arreglo por lo cual regresa todos los datos menos el del id que se busca
        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        })

        //fulanito se fue, persona borrada
        return personaBorrada;

    }

    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter( persona =>  persona.sala === sala) 
            return personasEnSala;
        
    }
    

}

module.exports = {
    Usuarios
}