package uoc.tfm.ticketrestaurant.cupones.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uoc.tfm.ticketrestaurant.cupones.model.CuponesDTO;
import uoc.tfm.ticketrestaurant.cupones.service.CuponesService;

@RestController
@RequestMapping("/api/cupones")
public class CuponesController {

    @Autowired
    CuponesService cuponService;

    @GetMapping
    public ResponseEntity<List<CuponesDTO>> getAllCuponesDtos() {
        return new ResponseEntity<List<CuponesDTO>>(cuponService.getCupones(), HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<?> createCupon(@RequestBody Long empleadoId) {
        cuponService.createCupon(empleadoId);
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el cupón correctamente"),
                HttpStatus.CREATED);
    }

    @PostMapping("canjear")
    public ResponseEntity<?> canjearCupon(@RequestBody Long id) {
        CuponesDTO cupon = cuponService.getById(id);
        if (cupon == null) {
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "El cupón no existe"),
                    HttpStatus.NOT_FOUND);
        }
        cuponService.canjear(id);
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Cupón validado correctamente"), HttpStatus.OK);
    }

}
