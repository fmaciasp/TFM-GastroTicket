export class EmpresaDTO{
    id!: number;
    nombre: string;
    email: string;

    constructor(nombre: string, email: string){
        this.nombre = nombre;
        this.email = email;
    }
}