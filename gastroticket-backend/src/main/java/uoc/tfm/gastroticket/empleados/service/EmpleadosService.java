package uoc.tfm.gastroticket.empleados.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import uoc.tfm.gastroticket.email.EmailService;
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
    @Autowired
    private EmailService emailService;

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

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseEntity<?> createEmpleado(String nombre, String apellidos, String email, String telefono,
            long empresaId) {
        User _user = new User();
        EmpleadosDTO _empleado = new EmpleadosDTO();

        try {
            _user.setRole(Role.EMPLEADO);
            _user.setUsername(email);
            _user = userRepository.save(_user);

            _empleado.setNombre(nombre);
            _empleado.setApellidos(apellidos);
            _empleado.setEmail(email);
            _empleado.setEmpresaId(empresaId);
            _empleado.setTelefono(telefono);
            _empleado.setUserId(_user.getId());
            empleadoRepo.save(_empleado);
        } catch (IOException e) {
            return new ResponseEntity("Error al crear al empleado", HttpStatus.BAD_REQUEST);
        }

        if (_user != null && _empleado != null) {
            // emailService.enviarEmail(_user, _empleado.getNombre(),
            // Role.EMPLEADO.toString());
        }

        return new ResponseEntity(Collections.singletonMap("mensaje", "El empleado se ha creado correctamente"),
                HttpStatus.OK);
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseEntity<?> editarEmpleado(long id, String nombre, String apellidos, String email, String telefono) {
        try {
            EmpleadosDTO _empleado = empleadoRepo.findById(id).get();
            if (_empleado.getUserId() != null) {
                User user = userRepository.findById(_empleado.getUserId()).orElse(null);
                if (user == null) {
                    throw new RuntimeException("Usuario no encontrado");
                }
                user.setUsername(email);
                userRepository.save(user);

                _empleado.setNombre(nombre);
                _empleado.setApellidos(apellidos);
                _empleado.setEmail(email);
                _empleado.setTelefono(telefono);
                empleadoRepo.save(_empleado);
            } else {
                return new ResponseEntity("No se ha encontrado el usuario", HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            return new ResponseEntity("Error al editar al empleado", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(Collections.singletonMap("mensaje", "El empleado se ha actualizado correctamente"),
                HttpStatus.OK);

    }

    public void eliminarEmpleado(long id) {
        empleadoRepo.deleteById(id);
    }

    public void enviarCorreo(String email, String activacionLink) {
        String emailContenido = "Haga clic en el siguiente enlace para activar su cuenta: " + activacionLink;
        enviarCorreo(email, emailContenido);
    }

}
