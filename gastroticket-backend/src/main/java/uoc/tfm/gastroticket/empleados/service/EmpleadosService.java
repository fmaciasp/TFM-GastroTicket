package uoc.tfm.gastroticket.empleados.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.repository.EmpleadosRepository;

@Service
@Transactional
public class EmpleadosService {

    @Autowired
    EmpleadosRepository empleadoRepo;

    public List<EmpleadosDTO> getEmpleadosPorEmpresa(long empresaId) {
        return empleadoRepo.findByEmpresaId(empresaId);
    }

    public EmpleadosDTO getEmpleadoById(long id) {
        return empleadoRepo.findById(id).orElse(null);
    }

    public EmpleadosDTO getEmpleadoByEmail(String email) {
        return empleadoRepo.findByEmail(email);
    }

    public void createEmpleado(String nombre, String apellidos, String email, long empresaId) {
        EmpleadosDTO _empleado = new EmpleadosDTO();
        _empleado.setNombre(nombre);
        _empleado.setApellidos(apellidos);
        _empleado.setEmail(email);
        _empleado.setEmpresaId(empresaId);
        empleadoRepo.save(_empleado);
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

}
