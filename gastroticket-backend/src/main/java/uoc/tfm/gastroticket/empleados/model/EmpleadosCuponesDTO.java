package uoc.tfm.gastroticket.empleados.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmpleadosCuponesDTO {
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;
    private long empresaId;
    private Long userId;
    private Long idCupon;
    private double importeCupon;
    private Date fechaUltimoUso;
    private String codigoCupon;
}
