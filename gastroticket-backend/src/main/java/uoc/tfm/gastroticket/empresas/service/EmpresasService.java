package uoc.tfm.gastroticket.empresas.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.repository.EmpresasRepository;

@Service
@Transactional
public class EmpresasService {

    @Autowired
    EmpresasRepository empresaRepo;

    public List<EmpresasDTO> getEmpresas() {
        return empresaRepo.findAll();
    }

    public EmpresasDTO getEmpresaById(long id) {
        return empresaRepo.findById(id).orElse(null);
    }

    public void createEmpresa(String nombre, String email) {
        EmpresasDTO _empresa = new EmpresasDTO();
        _empresa.setNombre(nombre);
        _empresa.setEmail(email);
        empresaRepo.save(_empresa);
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseEntity<?> editarEmpresa(long id, String nombre, String email) {
        EmpresasDTO _empresa = empresaRepo.findById(id).get();
        _empresa.setNombre(nombre);
        _empresa.setEmail(email);
        try {
            empresaRepo.save(_empresa);
        } catch (IOException e) {
            return new ResponseEntity("Error al editar la empresa", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(Collections.singletonMap("mensaje", "La empresa se ha actualizado correctamente"),
                HttpStatus.OK);
    }

    public void eliminarEmpresa(long id) {
        empresaRepo.deleteById(id);
    }
}
