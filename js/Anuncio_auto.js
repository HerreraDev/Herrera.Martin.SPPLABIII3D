import Anuncio from "./anuncio.js";

export default class Anuncio_auto extends Anuncio {

    constructor( id, titulo, transaccion, descripcion, precio, cantPuertas, cantKMS, potencia) {

        super( id, titulo, transaccion, descripcion, precio );
        this.cantPuertas = cantPuertas;
        this.cantKMS = cantKMS;
        this.potencia = potencia;
        
    }
}