export class EmpleadoDTO{
    id!: number;
    nombre: string;
    apellidos: string;
    telefono: number;
    empresaId: number;
    email: string;
    userId: number;

    constructor(nombre: string, apellidos: string, telefono: number, empresaId: number, email: string, userId: number){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.empresaId = empresaId;
        this.email = email;
        this.userId = userId;
    }
}