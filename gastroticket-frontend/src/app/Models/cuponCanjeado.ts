export class CuponCanjeadoDTO{
    id: number;
    cuponId: number;
    importeDescontado: number;
    importeFactura: number;
    userId: number;
    empleadoId: number;
    restauranteId: number;
    nombreRestaurante: string;
    empresaId: number;
    fechaUso: Date;

    constructor(id: number, cuponId: number, importeDescontado: number, importeFactura: number,  userId: number, empleadoId: number, restauranteId: number, nombreRestaurante: string, empresaId: number, fechaUso: Date){
        this.id = id;
        this.cuponId = cuponId;
        this.importeDescontado = importeDescontado;
        this.importeFactura = importeFactura;
        this.userId = userId;
        this.empleadoId = empleadoId;
        this.restauranteId = restauranteId;
        this.nombreRestaurante = nombreRestaurante;
        this.empresaId = empresaId;
        this.fechaUso = fechaUso;
    }
}