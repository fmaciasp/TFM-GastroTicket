package uoc.tfm.ticketrestaurant.cupones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uoc.tfm.ticketrestaurant.cupones.model.CuponesDTO;

@Repository
public interface CuponesRepository extends JpaRepository<CuponesDTO, Long> {

}
