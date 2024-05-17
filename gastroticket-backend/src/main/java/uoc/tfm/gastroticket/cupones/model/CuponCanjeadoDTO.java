package uoc.tfm.gastroticket.cupones.model;

import java.util.Date;

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
public class CuponCanjeadoDTO {
    @Id
    @GeneratedValue
    private Long id;
    private Long cuponId;
    private Long importeGastado;
    private Long userId;
    private Long empleadoId;
    private Long restauranteId;
    private Long empresaId;
    private Date fechaUso;
}
