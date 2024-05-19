export class CanjearCuponDTO{
    cuponId: number;
    importeDescontado: number;
    importeFactura: number;
    userId: number;
    empleadoId: number;
    restauranteId: number;

    constructor(cuponId: number, importeDescontado: number, importeFactura: number,  userId: number, empleadoId: number, restauranteId: number){
        this.cuponId = cuponId;
        this.importeDescontado = importeDescontado;
        this.importeFactura = importeFactura;
        this.userId = userId;
        this.empleadoId = empleadoId;
        this.restauranteId = restauranteId;
    }
}