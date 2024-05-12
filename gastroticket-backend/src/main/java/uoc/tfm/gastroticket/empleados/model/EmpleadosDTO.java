package uoc.tfm.gastroticket.empleados.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpleadosDTO {
    @Id
    @GeneratedValue
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private long empresaId;
    @Column(unique = true)
    private long userId;
}
