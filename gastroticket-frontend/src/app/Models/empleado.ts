export class EmpleadoDTO{
    id!: number;
    nombre: string;
    apellidos: string;
    telefono: number;
    empresaId: number;
    email: string;

    constructor(nombre: string, apellidos: string, telefono: number, empresaId: number, email: string){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.empresaId = empresaId;
        this.email = email;
    }
}