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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.service.EmpresasService;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin
public class EmpresasController {
    @Autowired
    EmpresasService empresasService;

    @GetMapping
    public ResponseEntity<List<EmpresasDTO>> getAllEmpresas() {
        return ResponseEntity.ok(empresasService.getEmpresas());
    }

    @PostMapping("create")
    public ResponseEntity<?> createEmpresa(@RequestBody EmpresasDTO empresa) {
        empresasService.createEmpresa(empresa.getNombre(), empresa.getEmail());
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "Se ha creado la empresa correctamente"),
                HttpStatus.CREATED);
    }

    @PutMapping("editar")
    public ResponseEntity<?> editarEmpresa(@RequestBody EmpresasDTO empresa) {
        EmpresasDTO _empresa = empresasService.getEmpresaById(empresa.getId());
        if (_empresa != null) {
            _empresa.setNombre(empresa.getNombre());
            empresasService.editarEmpresa(_empresa.getId(), empresa.getNombre());
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "La empresa se ha editado correctamente"));
        }
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado la empresa"),
                HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("delete")
    public ResponseEntity<?> deleteEmpresa(@RequestParam Long id) {
        if (empresasService.getEmpresaById(id) != null) {
            empresasService.eliminarEmpresa(id);
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "La empresa se ha eliminado correctamente"));
        }
        return new ResponseEntity<>(Collections.singletonMap("mensaje", "No se ha encontrado la empresa con id " + id),
                HttpStatus.NOT_FOUND);
    }
}
