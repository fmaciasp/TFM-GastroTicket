package uoc.tfm.gastroticket.empresas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public EmpresasDTO editarEmpresa(long id, String nombre) {
        EmpresasDTO _empresa = empresaRepo.findById(id).get();
        _empresa.setNombre(nombre);
        empresaRepo.save(_empresa);
        return _empresa;
    }

    public void eliminarEmpresa(long id) {
        empresaRepo.deleteById(id);
    }
}
