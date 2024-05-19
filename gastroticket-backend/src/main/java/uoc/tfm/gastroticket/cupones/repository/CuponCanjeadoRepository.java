package uoc.tfm.gastroticket.cupones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uoc.tfm.gastroticket.cupones.model.CuponCanjeadoDTO;
import java.util.List;

public interface CuponCanjeadoRepository extends JpaRepository<CuponCanjeadoDTO, Long> {

    List<CuponCanjeadoDTO> findByRestauranteId(Long restauranteId);

    List<CuponCanjeadoDTO> findByUserId(Long userId);

    List<CuponCanjeadoDTO> findByEmpleadoId(Long empleadoId);

}
