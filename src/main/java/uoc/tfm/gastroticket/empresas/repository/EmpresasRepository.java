package uoc.tfm.gastroticket.empresas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;

@Repository
public interface EmpresasRepository extends JpaRepository<EmpresasDTO, Long> {

}
