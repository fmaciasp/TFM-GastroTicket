export class CuponDTO{
    id: number;
    codigo: string;
    importe: number;
    empleadoId: number;
    fechaUltimoUso: Date;

    constructor(id: number, codigo: string, importe: number, empleadoId: number, fechaUltimoUso: Date){
        this.id = id;
        this.codigo = codigo;
        this.importe = importe;
        this.empleadoId = empleadoId;
        this.fechaUltimoUso = fechaUltimoUso;
    }
}