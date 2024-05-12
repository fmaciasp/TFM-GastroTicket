package uoc.tfm.gastroticket.restaurantes.service;

import java.util.Collections;
import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.restaurantes.model.RestaurantesDTO;
import uoc.tfm.gastroticket.restaurantes.repository.RestaurantesRepository;
import uoc.tfm.gastroticket.user.Role;
import uoc.tfm.gastroticket.user.User;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@Transactional
public class RestaurantesService {
    @Autowired
    RestaurantesRepository restauranteRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CuponesService cuponesService;

    public List<RestaurantesDTO> getRestaurantes() {
        return restauranteRepo.findAll();
    }

    public RestaurantesDTO getRestauranteById(long id) {
        return restauranteRepo.findById(id).orElse(null);
    }

    public void createRestaurante(String nombre, String email, String ciudad, String direccion) {
        User _user = new User();
        _user.setUsername(email);
        _user.setRole(Role.RESTAURANTE);
        _user = userRepository.save(_user);

        RestaurantesDTO _restaurante = new RestaurantesDTO();
        _restaurante.setNombre(nombre);
        _restaurante.setCorreo(email);
        _restaurante.setCiudad(ciudad);
        _restaurante.setDireccion(direccion);
        _restaurante.setUserId(_user.getId());
        restauranteRepo.save(_restaurante);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseEntity<?> editarRestaurante(long id, String nombre, String email, String ciudad, String direccion) {
        try {
            RestaurantesDTO _restaurante = restauranteRepo.findById(id).get();
            if (_restaurante.getUserId() != null) {
                User user = userRepository.findById(_restaurante.getUserId()).orElse(null);
                if (user == null) {
                    throw new RuntimeException("Usuario no encontrado");
                }
                user.setUsername(email);
                userRepository.save(user);
            }

            _restaurante.setNombre(nombre);
            _restaurante.setCiudad(ciudad);
            _restaurante.setDireccion(direccion);
            restauranteRepo.save(_restaurante);
        } catch (IOException e) {
            return new ResponseEntity("Error al editar el restaurante", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(Collections.singletonMap("mensaje", "La empresa se ha actualizado correctamente"),
                HttpStatus.OK);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseEntity<?> eliminarRestaurante(long id) {
        try {
            if (restauranteRepo.existsById(id)) {
                RestaurantesDTO _restaurante = restauranteRepo.findById(id).get();
                if (_restaurante.getUserId() != null) {
                    User user = userRepository.findById(_restaurante.getUserId()).orElse(null);
                    if (user != null) {
                        userRepository.delete(user);
                    }
                }
                cuponesService.eliminarCuponesPorRestaurante(id);
                restauranteRepo.delete(_restaurante);
            }
        } catch (IOException e) {
            return new ResponseEntity("Error al eliminar el restaurante", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(Collections.singletonMap("mensaje", "El restaurante se ha eliminado correctamente"),
                HttpStatus.OK);
    }
}
