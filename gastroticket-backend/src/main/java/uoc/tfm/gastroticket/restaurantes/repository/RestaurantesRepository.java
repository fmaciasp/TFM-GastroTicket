package uoc.tfm.gastroticket.restaurantes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uoc.tfm.gastroticket.restaurantes.model.RestaurantesDTO;

@Repository
public interface RestaurantesRepository extends JpaRepository<RestaurantesDTO, Long> {

}
