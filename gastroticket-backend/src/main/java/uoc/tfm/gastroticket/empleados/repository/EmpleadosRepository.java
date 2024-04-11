package uoc.tfm.gastroticket.empleados.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;

public interface EmpleadosRepository extends JpaRepository<EmpleadosDTO, Long> {

    List<EmpleadosDTO> findByEmpresaId(long empresaId);

    EmpleadosDTO findByEmail(String email);

}
