export class EmpresaDTO{
    id: number;
    nombre: string;
    email: string;

    constructor(id: number = -1, nombre: string = "", email: string = ""){
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }
}