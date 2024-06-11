package uoc.tfm.gastroticket.empresas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.email.EmailService;
import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.repository.EmpresasRepository;
import uoc.tfm.gastroticket.user.Role;
import uoc.tfm.gastroticket.user.User;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@Transactional
public class EmpresasService {

    @Autowired
    EmpresasRepository empresaRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    public List<EmpresasDTO> getEmpresas() {
        return empresaRepo.findAll();
    }

    public EmpresasDTO getEmpresaById(long id) {
        return empresaRepo.findById(id).orElse(null);
    }

    public EmpresasDTO getEmpresaByUserId(long id) {
        return empresaRepo.findByUserId(id);
    }

    @Transactional
    public void createEmpresa(String nombre, String email, HttpServletRequest request) {
        User _user = null;
        EmpresasDTO _empresa = null;

        if (userRepository.findByUsername(email).orElse(null) != null) {
            throw new RuntimeException("El correo electrónico ya está en uso");
        }

        _user = new User();
        _user.setUsername(email);
        _user.setRole(Role.EMPRESA);
        _user = userRepository.save(_user);

        _empresa = new EmpresasDTO();
        _empresa.setNombre(nombre);
        _empresa.setEmail(email);
        _empresa.setUserId(_user.getId());
        _empresa = empresaRepo.save(_empresa);

        if (_user != null && _empresa != null) {
            emailService.enviarEmail(_user, _empresa.getNombre(), Role.EMPRESA.toString());
        }

    }

    public void editarEmpresa(long id, String nombre, String email) {
        try {
            EmpresasDTO _empresa = empresaRepo.findById(id).get();
            if (_empresa.getUserId() != null) {
                User user = userRepository.findById(_empresa.getUserId()).orElse(null);
                if (user == null) {
                    throw new RuntimeException("Usuario no encontrado");
                }
                user.setUsername(email);
                userRepository.save(user);

                _empresa.setNombre(nombre);
                _empresa.setEmail(email);
                empresaRepo.save(_empresa);
            } else
                throw new RuntimeException("No se ha encontrado el usuario");

        } catch (IOException e) {
            throw new RuntimeException("Error al editar la empresa");
        }
    }

    public void eliminarEmpresa(long id) {
        try {
            if (empresaRepo.existsById(id)) {
                EmpresasDTO _empresa = empresaRepo.findById(id).get();
                if (_empresa.getUserId() != null) {
                    User user = userRepository.findById(_empresa.getUserId()).orElse(null);
                    if (user != null) {
                        userRepository.delete(user);
                    }
                }
                empresaRepo.deleteById(id);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar la empresa");
        }
    }
}
