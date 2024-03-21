package uoc.tfm.ticketrestaurant.cupones.model;

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
public class CuponesDTO {
    @Id
    @GeneratedValue
    private Long id;
    private String codigo;
    private Long empresaId;
    private Long empleadoId;
    private boolean canjeado;
    private Date fechaFin;
}
