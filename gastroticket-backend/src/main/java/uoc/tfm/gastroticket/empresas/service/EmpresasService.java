package uoc.tfm.gastroticket.empresas.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
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
    // private final JwtService jwtService = new JwtService();

    public List<EmpresasDTO> getEmpresas() {
        return empresaRepo.findAll();
    }

    public EmpresasDTO getEmpresaById(long id) {
        return empresaRepo.findById(id).orElse(null);
    }

    public EmpresasDTO getEmpresaByUserId(long id) {
        return empresaRepo.findByUserId(id);
    }

    public void createEmpresa(String nombre, String email, HttpServletRequest request) {
        User _user = new User();
        _user.setUsername(email);
        _user.setRole(Role.EMPRESA);
        _user = userRepository.save(_user);

        EmpresasDTO _empresa = new EmpresasDTO();
        _empresa.setNombre(nombre);
        _empresa.setEmail(email);
        _empresa.setUserId(_user.getId());
        empresaRepo.save(_empresa);

        // enviarCorreo(_user, _empresa, request);
    }

    /*
     * private void enviarCorreo(User _user, EmpresasDTO _empresa,
     * HttpServletRequest request) {
     * String url = getBaseUrl(request);
     * String token = jwtService.getTokenRegistro(_user);
     * String email = "Haga clic en el siguiente enlace para activar su cuenta" +
     * url + "/activate-account?token="
     * + token;
     * 
     * // enviar email
     * 
     * throw new
     * UnsupportedOperationException("Unimplemented method 'enviarCorreo'");
     * }
     * 
     * private String getBaseUrl(HttpServletRequest request) {
     * String scheme = request.getScheme(); // "http" o "https"
     * String serverName = request.getServerName(); // Nombre del servidor
     * int serverPort = request.getServerPort(); // Puerto del servidor
     * 
     * // Construir la URL base
     * StringBuilder baseUrlBuilder = new StringBuilder();
     * baseUrlBuilder.append(scheme).append("://").append(serverName);
     * 
     * // Si el puerto no es el predeterminado (80 para HTTP, 443 para HTTPS),
     * añadirlo
     * // a la URL
     * if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") &&
     * serverPort != 443)) {
     * baseUrlBuilder.append(":").append(serverPort);
     * }
     * 
     * // Si está desplegada en una subruta, añadir el contexto de la aplicación
     * String contextPath = request.getContextPath();
     * if (contextPath != null && !contextPath.isEmpty() &&
     * !"/".equals(contextPath)) {
     * baseUrlBuilder.append(contextPath);
     * }
     * 
     * return baseUrlBuilder.toString();
     * }
     */

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseEntity<?> editarEmpresa(long id, String nombre, String email) {
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
                return new ResponseEntity("No se ha encontrado el usuario", HttpStatus.NOT_FOUND);

        } catch (IOException e) {
            return new ResponseEntity("Error al editar la empresa", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(Collections.singletonMap("mensaje", "La empresa se ha actualizado correctamente"),
                HttpStatus.OK);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseEntity<?> eliminarEmpresa(long id) {
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
            return new ResponseEntity("Error al eliminar la empresa", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(Collections.singletonMap("mensaje", "La empresa se ha eliminado correctamente"),
                HttpStatus.OK);
    }
}
