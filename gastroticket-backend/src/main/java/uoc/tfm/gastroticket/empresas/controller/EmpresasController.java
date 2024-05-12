package uoc.tfm.gastroticket.empresas.controller;

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

import jakarta.servlet.http.HttpServletRequest;
import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.service.EmpresasService;
import uoc.tfm.gastroticket.user.UserRepository;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin
public class EmpresasController {
    @Autowired
    EmpresasService empresasService;
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<EmpresasDTO>> getAllEmpresas() {
        return ResponseEntity.ok(empresasService.getEmpresas());
    }

    @GetMapping("empresa")
    public ResponseEntity<EmpresasDTO> getEmpresa(@RequestParam Long id) {
        return ResponseEntity.ok(empresasService.getEmpresaById(id));
    }

    @GetMapping("empresa-por-usuario")
    public ResponseEntity<EmpresasDTO> getEmpresaPorUserId(@RequestParam Long id) {
        return ResponseEntity.ok(empresasService.getEmpresaByUserId(id));
    }

    @PostMapping("create")
    public ResponseEntity<?> createEmpresa(@RequestBody EmpresasDTO empresa, HttpServletRequest request) {
        empresasService.createEmpresa(empresa.getNombre(), empresa.getEmail(), request);
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado la empresa correctamente"),
                HttpStatus.CREATED);
    }

    @PostMapping("editar")
    public ResponseEntity<?> editarEmpresa(@RequestBody EmpresasDTO empresa) {
        try {
            EmpresasDTO _empresa = empresasService.getEmpresaById(empresa.getId());
            if (_empresa != null) {
                empresasService.editarEmpresa(_empresa.getId(), empresa.getNombre(), empresa.getEmail());
                return ResponseEntity.ok(Collections.singletonMap("mensaje", "La empresa se ha editado correctamente"));
            }
            return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado la empresa"),
                    HttpStatus.NOT_FOUND);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deleteEmpresa(@RequestParam Long id) {
        try {
            if (empresasService.getEmpresaById(id) != null) {
                empresasService.eliminarEmpresa(id);
                return ResponseEntity
                        .ok(Collections.singletonMap("mensaje", "La empresa se ha eliminado correctamente"));
            }
            return new ResponseEntity<>(
                    Collections.singletonMap("mensaje", "No se ha encontrado la empresa con id " + id),
                    HttpStatus.NOT_FOUND);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(ex.getMessage());
        }
    }
}
