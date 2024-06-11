package uoc.tfm.gastroticket.restaurantes.service;

import java.util.Collections;
import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.email.EmailService;
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
    @Autowired
    private EmailService emailService;

    public List<RestaurantesDTO> getRestaurantes() {
        return restauranteRepo.findAll();
    }

    public List<RestaurantesDTO> getRestaurantesActivos() {
        return restauranteRepo.findByActivo(true);
    }

    public RestaurantesDTO getRestauranteById(long id) {
        return restauranteRepo.findById(id).orElse(null);
    }

    public RestaurantesDTO getRestauranteByUserId(long id) {
        return restauranteRepo.findByUserId(id);
    }

    public void createRestaurante(String nombre, String email, String ciudad, String direccion) {
        User _user = new User();
        RestaurantesDTO _restaurante = new RestaurantesDTO();

        if (userRepository.findByUsername(email).orElse(null) != null) {
            throw new RuntimeException("El correo electrónico ya está en uso");
        }

        _user.setUsername(email);
        _user.setRole(Role.RESTAURANTE);
        _user = userRepository.save(_user);

        _restaurante.setNombre(nombre);
        _restaurante.setCorreo(email);
        _restaurante.setCiudad(ciudad);
        _restaurante.setDireccion(direccion);
        _restaurante.setUserId(_user.getId());
        restauranteRepo.save(_restaurante);

        if (_user != null && _restaurante != null) {
            emailService.enviarEmail(_user, _restaurante.getNombre(), Role.RESTAURANTE.toString());
        }
    }

    public void editarRestaurante(long id, String nombre, String email, String ciudad, String direccion) {
        try {
            RestaurantesDTO _restaurante = restauranteRepo.findById(id).get();
            if (_restaurante.getUserId() != null) {
                User user = userRepository.findById(_restaurante.getUserId()).orElse(null);
                if (user == null) {
                    throw new RuntimeException("Usuario no encontrado");
                }
                user.setUsername(email);
                userRepository.save(user);

                _restaurante.setNombre(nombre);
                _restaurante.setCiudad(ciudad);
                _restaurante.setDireccion(direccion);
                restauranteRepo.save(_restaurante);
            } else {
                throw new RuntimeException("No existe el usuario");
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al editar el restaurante");
        }
    }

    public void eliminarRestaurante(long id) {
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
            throw new RuntimeException("Error al eliminar el restaurante");
        }
    }
}
