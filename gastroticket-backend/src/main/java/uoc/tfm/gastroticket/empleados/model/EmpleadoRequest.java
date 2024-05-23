package uoc.tfm.gastroticket.empleados.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpleadoRequest {
    private long idEmpleado;
    private long idUsuario;
    private long idEmpresa;
}
