export class RestauranteDTO{
    id!: number;
    direccion: string;
    correo: string;
    nombre: string;
    ciudad: string;
    userId: number;

    constructor(direccion: string = "", correo: string, nombre: string, ciudad: string, userId: number){
        this.nombre = nombre;
        this.direccion = direccion;
        this.correo = correo;
        this.ciudad = ciudad;
        this.userId = userId
    }
}