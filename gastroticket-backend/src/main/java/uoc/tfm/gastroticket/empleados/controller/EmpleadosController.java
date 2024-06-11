package uoc.tfm.gastroticket.empleados.controller;

import java.util.Collections;

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

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import uoc.tfm.gastroticket.empleados.model.EmpleadoRequest;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.service.EmpleadosService;
import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.service.EmpresasService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/empleados")
@CrossOrigin
public class EmpleadosController {

    @Autowired
    EmpleadosService empleadosService;
    @Autowired
    EmpresasService empresasService;

    @PostMapping("por-empresa")
    public ResponseEntity<?> getEmpleadosByEmpresaId(@RequestBody EmpleadoRequest request) {
        EmpresasDTO empresa = empresasService.getEmpresaByUserId(request.getIdUsuario());
        if (empresa == null) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje",
                            "No existe ninguna empresa para el usuario con id " + request.getIdUsuario()),
                    HttpStatus.NOT_FOUND);
        }
        if (empresa.getId() != request.getIdEmpresa()) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje", "El empleado no pertenece a la empresa"),
                    HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(empleadosService.getEmpleadosPorEmpresa(empresa.getId()));
    }

    @GetMapping("all-empleados")
    public ResponseEntity<?> getAllEmpleados() {
        return ResponseEntity.ok(empleadosService.getAllEmpleados());
    }

    @PostMapping("empleado")
    public ResponseEntity<?> getEmpleadoById(@RequestBody EmpleadoRequest request) {
        EmpresasDTO empresa = empresasService.getEmpresaByUserId(request.getIdUsuario());
        EmpleadosDTO empleado = empleadosService.getEmpleadoById(request.getIdEmpleado());
        EmpresasDTO empresaDelEmpleado = empresasService.getEmpresaById(empleado.getEmpresaId());
        if (empresa == null) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje",
                            "No existe ninguna empresa para el usuario " + request.getIdUsuario()),
                    HttpStatus.NOT_FOUND);
        }
        if (empresaDelEmpleado == null) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje",
                            "No existe ninguna empresa para el empleado " + request.getIdEmpleado()),
                    HttpStatus.NOT_FOUND);
        }
        if (empresa != empresaDelEmpleado) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje", "El empleado no pertenece a la empresa"),
                    HttpStatus.FORBIDDEN);
        }

        EmpleadosDTO _empleado = empleadosService.getEmpleadoById(request.getIdEmpleado());
        if (_empleado == null) {
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje",
                            "No existe ningún empleado con el empleadoId " + request.getIdEmpleado()),
                    HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(_empleado);

    }

    @GetMapping("empleado-por-userId")
    public ResponseEntity<?> getEmpleadoByUserId(@RequestParam long userId) {
        EmpleadosDTO _empleado = empleadosService.getEmpleadoPorUserId(userId);
        if (_empleado != null) {
            return ResponseEntity.ok(_empleado);
        }
        return new ResponseEntity<>(
                Collections.singletonMap("mensaje", "No existe ningún empleado con el userId " + userId),
                HttpStatus.NOT_FOUND);

    }

    @PostMapping("create")
    public ResponseEntity<?> createEmpleado(@RequestBody EmpleadosDTO empleado, HttpServletRequest request) {
        try {
            empleadosService.createEmpleado(empleado.getNombre(), empleado.getApellidos(),
                    empleado.getEmail(), empleado.getTelefono(),
                    empleado.getEmpresaId());
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado el empleado correctamente"),
                    HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
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
                        .ok(Collections.singletonMap("mensaje", "El empleado se ha editado correctamente"));
            }
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado el empleado"),
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
