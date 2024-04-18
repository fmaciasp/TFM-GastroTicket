export class RestauranteDTO{
    id!: number;
    direccion: string;
    nombre: string;

    constructor(direccion: string, nombre: string){
        this.nombre = nombre;
        this.direccion = direccion;
    }
}