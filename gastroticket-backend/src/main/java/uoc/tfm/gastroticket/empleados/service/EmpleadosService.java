package uoc.tfm.gastroticket.empleados.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.repository.EmpleadosRepository;
import uoc.tfm.gastroticket.jwt.JwtService;
import uoc.tfm.gastroticket.user.Role;
import uoc.tfm.gastroticket.user.User;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class EmpleadosService {

    @Autowired
    EmpleadosRepository empleadoRepo;
    private final JwtService jwtService;
    @Autowired
    UserRepository userRepository;

    public List<EmpleadosDTO> getAllEmpleados() {
        return empleadoRepo.findAll();
    }

    public List<EmpleadosDTO> getEmpleadosPorEmpresa(long empresaId) {
        return empleadoRepo.findByEmpresaId(empresaId);
    }

    public EmpleadosDTO getEmpleadoById(long id) {
        return empleadoRepo.findById(id).orElse(null);
    }

    public EmpleadosDTO getEmpleadoByEmail(String email) {
        return empleadoRepo.findByEmail(email);
    }

    public EmpleadosDTO createEmpleado(String nombre, String apellidos, String email, long empresaId) {
        User _user = new User();
        _user.setRole(Role.EMPLEADO);
        _user.setUsername(email);
        _user = userRepository.save(_user);

        EmpleadosDTO _empleado = new EmpleadosDTO();
        _empleado.setNombre(nombre);
        _empleado.setApellidos(apellidos);
        _empleado.setEmail(email);
        _empleado.setEmpresaId(empresaId);
        _empleado.setUserId(_user.getId());
        empleadoRepo.save(_empleado);
        return _empleado;
    }

    public EmpleadosDTO editarEmpleado(long id, String nombre, String apellidos) {
        EmpleadosDTO _empleado = empleadoRepo.findById(id).get();
        _empleado.setNombre(nombre);
        _empleado.setApellidos(apellidos);
        empleadoRepo.save(_empleado);
        return _empleado;
    }

    public void eliminarEmpleado(long id) {
        empleadoRepo.deleteById(id);
    }

    public void enviarCorreo(String email, String activacionLink) {
        String emailContenido = "Haga clic en el siguiente enlace para activar su cuenta: " + activacionLink;
        enviarCorreo(email, emailContenido);
    }

    public String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme(); // "http" o "https"
        String serverName = request.getServerName(); // Nombre del servidor
        int serverPort = request.getServerPort(); // Puerto del servidor

        // Construir la URL base
        StringBuilder baseUrlBuilder = new StringBuilder();
        baseUrlBuilder.append(scheme).append("://").append(serverName);

        // Si el puerto no es el predeterminado (80 para HTTP, 443 para HTTPS),añadirlo
        // a la URL
        if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") &&
                serverPort != 443)) {
            baseUrlBuilder.append(":").append(serverPort);
        }

        // Si está desplegada en una subruta, añadir el contexto de la aplicación
        String contextPath = request.getContextPath();
        if (contextPath != null && !contextPath.isEmpty() &&
                !"/".equals(contextPath)) {
            baseUrlBuilder.append(contextPath);
        }

        return baseUrlBuilder.toString();
    }

}
