package uoc.tfm.gastroticket.restaurantes.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.restaurantes.model.RestaurantesDTO;
import uoc.tfm.gastroticket.restaurantes.service.RestaurantesService;
import uoc.tfm.gastroticket.user.UserRepository;

@RestController
@RequestMapping("/api/restaurantes")
@CrossOrigin
public class RestaurantesController {
    @Autowired
    RestaurantesService restaurantesService;
    @Autowired
    CuponesService cuponesService;
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<RestaurantesDTO>> getAllRestaurantes() {
        return ResponseEntity.ok(restaurantesService.getRestaurantes());
    }

    @GetMapping("restaurante")
    public ResponseEntity<RestaurantesDTO> getRestaurante(@RequestParam Long id) {
        return ResponseEntity.ok(restaurantesService.getRestauranteById(id));
    }

    @PostMapping("create")
    public ResponseEntity<?> createRestaurante(@RequestBody RestaurantesDTO restaurante) {
        restaurantesService.createRestaurante(restaurante.getNombre(), restaurante.getCorreo(), restaurante.getCiudad(),
                restaurante.getDireccion());
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el restaurante correctamente"),
                HttpStatus.CREATED);
    }

    @PostMapping("editar")
    public ResponseEntity<?> editarRestaurante(@RequestBody RestaurantesDTO restaurante) {
        try {
            RestaurantesDTO _restaurante = restaurantesService.getRestauranteById(restaurante.getId());
            if (_restaurante != null) {
                restaurantesService.editarRestaurante(_restaurante.getId(), _restaurante.getNombre(),
                        _restaurante.getCorreo(), restaurante.getCiudad(), _restaurante.getDireccion());
                return ResponseEntity
                        .ok(Collections.singletonMap("mensaje", "El restaurante se ha editado correctamente"));
            }
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado el restaurante"),
                    HttpStatus.NOT_FOUND);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deleteRestaurante(@RequestParam Long restauranteId) {
        try {
            if (restaurantesService.getRestauranteById(restauranteId) != null) {
                restaurantesService.eliminarRestaurante(restauranteId);
                return ResponseEntity
                        .ok(Collections.singletonMap("mensaje", "El restaurante se ha eliminado correctamente"));
            }
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje", "No se ha encontrado el restaurante con id " + restauranteId),
                    HttpStatus.NOT_FOUND);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(ex.getMessage());
        }
    }
}
