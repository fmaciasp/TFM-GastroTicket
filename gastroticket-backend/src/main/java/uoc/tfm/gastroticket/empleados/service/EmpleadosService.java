package uoc.tfm.gastroticket.empleados.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import uoc.tfm.gastroticket.cupones.model.CuponesDTO;
import uoc.tfm.gastroticket.cupones.service.CuponesService;
import uoc.tfm.gastroticket.email.EmailService;
import uoc.tfm.gastroticket.empleados.model.EmpleadosCuponesDTO;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.repository.EmpleadosRepository;
import uoc.tfm.gastroticket.user.Role;
import uoc.tfm.gastroticket.user.User;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class EmpleadosService {

    @Autowired
    EmpleadosRepository empleadoRepo;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private CuponesService cuponesService;

    public List<EmpleadosDTO> getAllEmpleados() {
        return empleadoRepo.findAll();
    }

    public List<EmpleadosCuponesDTO> getEmpleadosPorEmpresa(long empresaId) {
        List<EmpleadosDTO> listaEmpleados = empleadoRepo.findByEmpresaId(empresaId);
        List<EmpleadosCuponesDTO> listEmpleadosCupones = new ArrayList<EmpleadosCuponesDTO>();
        CuponesDTO cupon = null;
        for (EmpleadosDTO _empleado : listaEmpleados) {
            cupon = cuponesService.getByEmpleadoId(_empleado.getId());
            listEmpleadosCupones.add(new EmpleadosCuponesDTO(
                    _empleado.getId(),
                    _empleado.getNombre(),
                    _empleado.getApellidos(),
                    _empleado.getEmail(),
                    _empleado.getTelefono(),
                    empresaId,
                    _empleado.getUserId(),
                    cupon.getId(),
                    cupon.getImporte(),
                    cupon.getFechaUltimoUso(),
                    cupon.getCodigo()));
        }

        return listEmpleadosCupones;
    }

    public EmpleadosDTO getEmpleadoById(long id) {
        return empleadoRepo.findById(id).orElse(null);
    }

    public EmpleadosDTO getEmpleadoByEmail(String email) {
        return empleadoRepo.findByEmail(email);
    }

    public EmpleadosDTO getEmpleadoPorUserId(long userId) {
        return empleadoRepo.findByUserId(userId);
    }

    public void createEmpleado(String nombre, String apellidos, String email, String telefono,
            long empresaId) {
        User _user = new User();
        EmpleadosDTO _empleado = new EmpleadosDTO();

        if (userRepository.findByUsername(email).orElse(null) != null) {
            throw new RuntimeException("El correo electrónico ya está en uso");
        }

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
            _empleado = empleadoRepo.save(_empleado);

            cuponesService.createCupon(_empleado.getId());

        } catch (IOException e) {
            throw new RuntimeException("Error al crear al empleado");
        }

        if (_user != null && _empleado != null) {
            emailService.enviarEmail(_user, _empleado.getNombre(),
                    Role.EMPLEADO.toString());
        }
    }

    public void editarEmpleado(long id, String nombre, String apellidos, String email, String telefono) {
        try {
            EmpleadosDTO _empleado = empleadoRepo.findById(id).get();
            if (_empleado.getUserId() != null) {
                User user = userRepository.findById(_empleado.getUserId()).orElse(null);
                if (user == null) {
                    throw new RuntimeException("Usuario no encontrado");
                }
                User user_aux = userRepository.findByUsername(email).orElse(null);
                if (user_aux != null && user_aux.getId() != user.getId()) {
                    throw new RuntimeException("El email ya está en uso");
                }
                user.setUsername(email);
                userRepository.save(user);

                _empleado.setNombre(nombre);
                _empleado.setApellidos(apellidos);
                _empleado.setEmail(email);
                _empleado.setTelefono(telefono);
                empleadoRepo.save(_empleado);
            } else {
                throw new RuntimeException("Usuario no encontrado");
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al editar al empleado");
        }

    }

    public void eliminarEmpleado(long id) {
        EmpleadosDTO empleado = empleadoRepo.findById(id).get();
        User user = userRepository.findById(empleado.getUserId()).get();
        userRepository.delete(user);
        empleadoRepo.delete(empleado);
    }

    public void enviarCorreo(String email, String activacionLink) {
        String emailContenido = "Haga clic en el siguiente enlace para activar su cuenta: " + activacionLink;
        enviarCorreo(email, emailContenido);
    }

}
