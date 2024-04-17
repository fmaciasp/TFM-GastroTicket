package uoc.tfm.gastroticket.cupones.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uoc.tfm.gastroticket.cupones.model.CuponesDTO;

@Repository
public interface CuponesRepository extends JpaRepository<CuponesDTO, Long> {

    CuponesDTO findByCodigo(String codigo);

    List<CuponesDTO> findByRestauranteId(Long restauranteId);

}
