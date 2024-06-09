package uoc.tfm.gastroticket.cupones.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uoc.tfm.gastroticket.cupones.model.CargaCuponDTO;
import uoc.tfm.gastroticket.cupones.model.CuponCanjeadoDTO;
import uoc.tfm.gastroticket.cupones.model.CuponesDTO;
import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.empleados.service.EmpleadosService;
import uoc.tfm.gastroticket.empresas.service.EmpresasService;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/cupones")
@CrossOrigin
public class CuponesController {

    @Autowired
    CuponesService cuponService;

    @Autowired
    EmpleadosService empleadosService;
    @Autowired
    EmpresasService empresasService;

    @GetMapping
    public ResponseEntity<List<CuponesDTO>> getAllCuponesDtos() {
        return new ResponseEntity<List<CuponesDTO>>(cuponService.getCupones(), HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<?> createCupon(@RequestBody CuponesDTO cupon) {
        try {
            cuponService.createCupon(cupon.getEmpleadoId());
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el cupón correctamente"),
                HttpStatus.CREATED);
    }

    @PostMapping("cargar-cupon")
    public ResponseEntity<?> cargarCupon(@RequestBody CargaCuponDTO cupon) {
        try {
            cuponService.cargarCupon(cupon.getEmpleadoId(), cupon.getImporte());
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

        return new ResponseEntity<>(Collections.singletonMap("mensaje", "El cupón ha sido cargado correctamente"),
                HttpStatus.OK);
    }

    @GetMapping("get-cupon")
    public ResponseEntity<?> getCupon(@RequestParam Long empleadoId) {
        return new ResponseEntity<CuponesDTO>(cuponService.getByEmpleadoId(empleadoId), HttpStatus.OK);
    }

    @GetMapping("get-cupon-codigo")
    public ResponseEntity<?> getCuponPorCodigo(@RequestParam String codigo) {
        return new ResponseEntity<CuponesDTO>(cuponService.getByCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping("get-cupones-canjeados-empleado")
    public ResponseEntity<?> getCuponesCanjeadosPorEmpleado(@RequestParam Long empleadoId) {
        return new ResponseEntity<List<CuponCanjeadoDTO>>(cuponService.getCanjeadosPorEmpleado(empleadoId),
                HttpStatus.OK);
    }

    @GetMapping("get-cupones-canjeados-restaurante")
    public ResponseEntity<?> getCuponesCanjeadosPorRestaurante(@RequestParam Long restauranteId) {
        return new ResponseEntity<List<CuponCanjeadoDTO>>(cuponService.getByRestauranteId(restauranteId),
                HttpStatus.OK);
    }

    @PostMapping("canjear")
    public ResponseEntity<?> canjearCupon(@RequestBody CuponCanjeadoDTO cuponCanjeadoRequestDTO) {
        try {
            cuponService.canjearCupon(
                    cuponCanjeadoRequestDTO.getCuponId(),
                    cuponCanjeadoRequestDTO.getUserId(),
                    cuponCanjeadoRequestDTO.getImporteDescontado(),
                    cuponCanjeadoRequestDTO.getImporteFactura(),
                    cuponCanjeadoRequestDTO.getEmpleadoId(),
                    cuponCanjeadoRequestDTO.getRestauranteId());
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "Cupón validado correctamente"),
                    HttpStatus.OK);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

}
