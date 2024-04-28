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

import uoc.tfm.gastroticket.cupones.model.CanjearCuponDTO;
import uoc.tfm.gastroticket.cupones.model.CuponesDTO;
import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.service.EmpleadosService;
import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.service.EmpresasService;

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
        EmpleadosDTO empleado = empleadosService.getEmpleadoById(cupon.getEmpleadoId());
        EmpresasDTO empresa = empresasService.getEmpresaById(cupon.getEmpresaId());

        if (empleado == null) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje", "El empleado con id " + cupon.getEmpleadoId() + " no existe"),
                    HttpStatus.NOT_FOUND);
        }
        if (empresa == null) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje", "La empresa con id " + cupon.getEmpresaId() + " no existe"),
                    HttpStatus.NOT_FOUND);
        }
        if (empleado.getEmpresaId() != empresa.getId()) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje",
                            "El empleado con id " + cupon.getEmpleadoId() + " no pertenece a la empresa con id "
                                    + cupon.getEmpresaId()),
                    HttpStatus.NOT_FOUND);
        }
        cuponService.createCupon(cupon.getEmpleadoId(), cupon.getEmpresaId());
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el cupón correctamente"),
                HttpStatus.CREATED);
    }

    @PostMapping("canjear")
    public ResponseEntity<?> canjearCupon(@RequestBody CanjearCuponDTO cuponRequestDTO) {
        CuponesDTO cupon = cuponService.getById(cuponRequestDTO.getId());
        if (cupon == null) {
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "El cupón no existe"),
                    HttpStatus.NOT_FOUND);
        }
        cuponService.canjear(cuponRequestDTO.getId(), cuponRequestDTO.getRestauranteId());
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Cupón validado correctamente"), HttpStatus.OK);
    }

}
