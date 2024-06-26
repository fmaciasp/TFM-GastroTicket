package uoc.tfm.gastroticket.empresas.model;

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
public class EmpresasDTO {
    @Id
    @GeneratedValue
    private Long id;
    private String nombre;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private Long userId;
}
