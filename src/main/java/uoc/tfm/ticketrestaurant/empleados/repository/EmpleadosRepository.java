package uoc.tfm.ticketrestaurant.empleados.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import uoc.tfm.ticketrestaurant.empleados.model.EmpleadosDTO;

public interface EmpleadosRepository extends JpaRepository<EmpleadosDTO, Long> {

    List<EmpleadosDTO> findByEmpresaId(long empresaId);

    EmpleadosDTO findByEmail(String email);

}
