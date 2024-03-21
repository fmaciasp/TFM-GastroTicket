package uoc.tfm.ticketrestaurant.empresas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uoc.tfm.ticketrestaurant.empresas.model.EmpresasDTO;
import uoc.tfm.ticketrestaurant.empresas.repository.EmpresasRepository;

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
        Optional<EmpresasDTO> _emp = empresaRepo.findById(id);
        if (_emp.isPresent()) {
            EmpresasDTO _empresa = _emp.get();
            _empresa.setNombre(nombre);
            empresaRepo.save(_empresa);
            return _empresa;
        }
        return null;
    }

    public void eliminarEmpresa(long id) {
        Optional<EmpresasDTO> _emp = empresaRepo.findById(id);
        if (_emp.isPresent()) {
            empresaRepo.deleteById(id);
        }
    }
}
