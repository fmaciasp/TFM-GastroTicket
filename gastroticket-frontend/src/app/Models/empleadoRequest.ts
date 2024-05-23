export class EmpleadoRequest{
    idEmpleado: number;
    idUsuario: number;
    idEmpresa: number;

    constructor(idEmpleado: number, idUsuario: number, idEmpresa: number){
        this.idEmpleado = idEmpleado;
        this.idUsuario = idUsuario;
        this.idEmpresa = idEmpresa;
    }
}