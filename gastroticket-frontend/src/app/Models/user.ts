export class UserDTO{
    id!: number;
    nombre: string;
    apellidos: string;
    email: string;

    constructor(nombre: string, apellidos: string, email: string){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
    }
}