package uoc.tfm.gastroticket.restaurantes.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uoc.tfm.gastroticket.cupones.model.CuponesDTO;
import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.restaurantes.model.RestaurantesDTO;
import uoc.tfm.gastroticket.restaurantes.service.RestaurantesService;

@RestController
@RequestMapping("/api/restaurantes")
public class RestaurantesController {
    @Autowired
    RestaurantesService restaurantesService;
    @Autowired
    CuponesService cuponesService;

    @GetMapping
    public ResponseEntity<List<RestaurantesDTO>> getAllRestaurantes() {
        return ResponseEntity.ok(restaurantesService.getRestaurantes());
    }

    @PostMapping("create")
    public ResponseEntity<?> createRestaurante(@RequestBody RestaurantesDTO restaurante) {
        restaurantesService.createRestaurante(restaurante.getNombre(), restaurante.getDireccion());
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el restaurante correctamente"),
                HttpStatus.CREATED);
    }

    @PutMapping("editar")
    public ResponseEntity<?> editarRestaurante(@RequestBody RestaurantesDTO restaurante) {
        RestaurantesDTO _restaurante = restaurantesService.getRestauranteById(restaurante.getId());
        if (_restaurante != null) {
            _restaurante.setNombre(restaurante.getNombre());
            restaurantesService.editarRestaurante(_restaurante.getId(), _restaurante.getNombre(),
                    _restaurante.getDireccion());
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "El restaurante se ha editado correctamente"));
        }
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado el restaurante"),
                HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deleteRestaurante(@RequestParam Long restauranteId) {
        if (restaurantesService.getRestauranteById(restauranteId) != null) {
            List<CuponesDTO> _cupones = cuponesService.getByRestauranteId(restauranteId);
            if (!_cupones.isEmpty()) {
                cuponesService.eliminarCupones(_cupones);
            }
            restaurantesService.eliminarRestaurante(restauranteId);
            return ResponseEntity
                    .ok(Collections.singletonMap("mensaje", "El restaurante se ha eliminado correctamente"));
        }
        return new ResponseEntity<>(
                Collections.singletonMap("mensaje", "No se ha encontrado el restaurante con id " + restauranteId),
                HttpStatus.NOT_FOUND);
    }
}
