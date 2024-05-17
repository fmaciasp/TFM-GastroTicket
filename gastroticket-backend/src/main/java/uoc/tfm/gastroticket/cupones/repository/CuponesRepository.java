package uoc.tfm.gastroticket.cupones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uoc.tfm.gastroticket.cupones.model.CuponesDTO;

@Repository
public interface CuponesRepository extends JpaRepository<CuponesDTO, Long> {

    CuponesDTO findByCodigo(String codigo);

    CuponesDTO findByEmpleadoId(Long empleadoId);

}
