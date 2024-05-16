package uoc.tfm.gastroticket.empleados.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.service.EmpleadosService;
import uoc.tfm.gastroticket.empresas.service.EmpresasService;
import uoc.tfm.gastroticket.jwt.JwtService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/empleados")
@CrossOrigin
public class EmpleadosController {

    private final JwtService jwtService;
    @Autowired
    EmpleadosService empleadosService;
    @Autowired
    EmpresasService empresasService;

    @GetMapping("por-empresa")
    public ResponseEntity<?> getEmpleadosByEmpresaId(@RequestParam long empresaId) {
        if (empresasService.getEmpresaById(empresaId) != null) {
            return ResponseEntity.ok(empleadosService.getEmpleadosPorEmpresa(empresaId));
        }
        return new ResponseEntity<>(
                Collections.singletonMap("mensaje", "No existe ninguna empresa con el id " + empresaId),
                HttpStatus.NOT_FOUND);
    }

    @GetMapping("all-empleados")
    public ResponseEntity<?> getAllEmpleados() {
        return ResponseEntity.ok(empleadosService.getAllEmpleados());
    }

    @GetMapping("empleado")
    public ResponseEntity<?> getEmpleadoById(@RequestParam long empleadoId) {
        EmpleadosDTO _empleado = empleadosService.getEmpleadoById(empleadoId);
        if (_empleado != null) {
            return ResponseEntity.ok(_empleado);
        }
        return new ResponseEntity<>(
                Collections.singletonMap("mensaje", "No existe ningún empleado con el id " + empleadoId),
                HttpStatus.NOT_FOUND);

    }

    @PostMapping("create")
    public ResponseEntity<?> createEmpleado(@RequestBody EmpleadosDTO empleado, HttpServletRequest request) {
        if (empleadosService.getEmpleadoByEmail(empleado.getEmail()) == null) {
            empleadosService.createEmpleado(empleado.getNombre(), empleado.getApellidos(),
                    empleado.getEmail(), empleado.getTelefono(),
                    empleado.getEmpresaId());
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el empleado correctamente"),
                    HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje",
                            "No se ha podido crear el empleado porque ya existe ese correo"),
                    HttpStatus.CONFLICT);
        }
    }

    @PostMapping("editar")
    public ResponseEntity<?> editarEmpleado(@RequestBody EmpleadosDTO empleado) {
        try {
            EmpleadosDTO _empleado = empleadosService.getEmpleadoById(empleado.getId());
            if (_empleado != null) {
                empleadosService.editarEmpleado(_empleado.getId(), empleado.getNombre(), empleado.getApellidos(),
                        empleado.getEmail(), empleado.getTelefono());
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
    public ResponseEntity<?> deleteEmpleado(@RequestParam Long id) {
        if (empleadosService.getEmpleadoById(id) != null) {
            empleadosService.eliminarEmpleado(id);
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "El empleado se ha eliminado correctamente"));
        }
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado el empleado con id " + id),
                HttpStatus.NOT_FOUND);
    }

}
