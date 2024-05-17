export class EmpleadoCuponDTO{
    id: number;
    nombre: string;
    apellidos: string;
    telefono: number;
    empresaId: number;
    email: string;
    userId: number;
    cuponId: number;
    importeCupon: number;
    fechaultimoUso: Date;
    codigoCupon: string;

    constructor(id: number, 
        nombre: string, 
        apellidos: string, 
        telefono: number, 
        empresaId: number, 
        email: string, 
        userId: number,
        cuponId: number,
        importeCupon: number,
        fechaultimoUso: Date,
        codigoCupon: string
    ){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.empresaId = empresaId;
        this.email = email;
        this.userId = userId;
        this.cuponId = cuponId;
        this.importeCupon = importeCupon;
        this.fechaultimoUso = fechaultimoUso;
        this.codigoCupon = codigoCupon;
    }
}