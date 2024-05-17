export class CuponCargaDTO{
    empleadoId: number;
    importe: number;

    constructor(empleadoId: number, importe: number){
        this.empleadoId = empleadoId;
        this.importe = importe;
    }
}