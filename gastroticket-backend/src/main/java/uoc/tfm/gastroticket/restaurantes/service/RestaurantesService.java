package uoc.tfm.gastroticket.restaurantes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.restaurantes.model.RestaurantesDTO;
import uoc.tfm.gastroticket.restaurantes.repository.RestaurantesRepository;

@Service
@Transactional
public class RestaurantesService {
    @Autowired
    RestaurantesRepository restauranteRepo;

    public List<RestaurantesDTO> getRestaurantes() {
        return restauranteRepo.findAll();
    }

    public RestaurantesDTO getRestauranteById(long id) {
        return restauranteRepo.findById(id).orElse(null);
    }

    public void createRestaurante(String nombre, String direccion) {
        RestaurantesDTO _restaurante = new RestaurantesDTO();
        _restaurante.setNombre(nombre);
        _restaurante.setDireccion(direccion);
        restauranteRepo.save(_restaurante);
    }

    public RestaurantesDTO editarRestaurante(long id, String nombre, String direccion) {
        RestaurantesDTO _restaurante = restauranteRepo.findById(id).get();
        _restaurante.setNombre(nombre);
        _restaurante.setDireccion(direccion);
        restauranteRepo.save(_restaurante);
        return _restaurante;
    }

    public void eliminarRestaurante(long id) {
        restauranteRepo.deleteById(id);
    }
}
