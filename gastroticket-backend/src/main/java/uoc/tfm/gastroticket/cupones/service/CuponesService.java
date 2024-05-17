package uoc.tfm.gastroticket.cupones.service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uoc.tfm.gastroticket.cupones.model.CuponCanjeadoDTO;
import uoc.tfm.gastroticket.cupones.model.CuponesDTO;
import uoc.tfm.gastroticket.cupones.repository.CuponCanjeadoRepository;
import uoc.tfm.gastroticket.cupones.repository.CuponesRepository;
import uoc.tfm.gastroticket.empleados.model.EmpleadosDTO;
import uoc.tfm.gastroticket.empleados.repository.EmpleadosRepository;
import uoc.tfm.gastroticket.empresas.repository.EmpresasRepository;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@Transactional
public class CuponesService {

    @Autowired
    CuponesRepository cuponRepo;

    @Autowired
    EmpresasRepository empresaRepo;

    @Autowired
    EmpleadosRepository empleadoRepo;
    @Autowired
    CuponCanjeadoRepository cuponCanjeadoRepo;
    @Autowired
    UserRepository userRepository;

    private static final String ALFANUMERICO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public List<CuponesDTO> getCupones() {
        return cuponRepo.findAll();
    }

    public CuponesDTO getById(long id) {
        return cuponRepo.findById(id).orElse(null);
    }

    public CuponesDTO getByEmpleadoId(long empleadoId) {
        return cuponRepo.findByEmpleadoId(empleadoId);
    }

    public List<CuponCanjeadoDTO> getByRestauranteId(long restauranteId) {
        return cuponCanjeadoRepo.findByRestauranteId(restauranteId);
    }

    public void eliminarCuponesPorRestaurante(long restauranteId) {
        List<CuponCanjeadoDTO> list_cupones = cuponCanjeadoRepo.findByRestauranteId(restauranteId);
        eliminarCupones(list_cupones);
    }

    public void eliminarCupones(List<CuponCanjeadoDTO> cupones) {
        for (CuponCanjeadoDTO cupon : cupones) {
            cuponCanjeadoRepo.delete(cupon);
        }
    }

    public void createCupon(long empleadoId) {

        if (!empleadoRepo.existsById(empleadoId)) {
            throw new RuntimeException("El empleado no existe");
        }

        String codigo = generarCodigo().toString();

        CuponesDTO _cupon = new CuponesDTO();
        _cupon.setEmpleadoId(empleadoId);
        _cupon.setImporte(0L);
        _cupon.setFechaUltimoUso(null);
        _cupon.setCodigo(codigo);
        cuponRepo.save(_cupon);
    }

    public void cargarCupon(Long empleadoId, long importe) {
        if (empleadoId == null)
            throw new RuntimeException("El empleado no existe");

        EmpleadosDTO empleado = empleadoRepo.findById(empleadoId).orElse(null);

        if (empleado == null) {
            throw new RuntimeException("El empleado no existe");
        }

        CuponesDTO cupon = cuponRepo.findByEmpleadoId(empleado.getId());
        long importeCupon = cupon.getImporte();
        long total = importeCupon + importe;
        cupon.setImporte(total);
        cuponRepo.save(cupon);
    }

    public void canjearCupon(long cuponId, long userId, long importeGastado, long empleadoId, long restauranteId,
            long empresaId) {

        Calendar _calendar = Calendar.getInstance();
        _calendar.clear(Calendar.HOUR_OF_DAY);
        _calendar.clear(Calendar.MINUTE);
        _calendar.clear(Calendar.SECOND);
        _calendar.clear(Calendar.MILLISECOND);
        Date hoy = _calendar.getTime();

        CuponesDTO cupon = cuponRepo.findById(cuponId).orElse(null);
        if (cupon == null) {
            throw new RuntimeException("El cupón no es válido");
        }
        if (cupon.getFechaUltimoUso() != null && cupon.getFechaUltimoUso() == hoy) {
            throw new RuntimeException("El cupón ya ha sido utilizado hoy");
        }

        try {
            cupon.setFechaUltimoUso(hoy);
            cuponRepo.save(cupon);

            CuponCanjeadoDTO cuponCanjeado = new CuponCanjeadoDTO();
            cuponCanjeado.setImporteGastado(importeGastado);
            cuponCanjeado.setUserId(userId);
            cuponCanjeado.setEmpleadoId(empleadoId);
            cuponCanjeado.setRestauranteId(restauranteId);
            cuponCanjeado.setEmpresaId(empresaId);
            cuponCanjeado.setFechaUso(_calendar.getTime());
            cuponCanjeadoRepo.save(cuponCanjeado);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
    }

    private String generarCodigo() {
        boolean existe = true;
        String codigo = "";
        while (existe) {
            codigo = codigo();
            if (cuponRepo.findByCodigo(codigo) == null) {
                existe = false;
            }
        }

        return codigo.toString();
    }

    private String codigo() {
        StringBuilder codigo = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            if (i > 0) {
                codigo.append("-");
            }
            for (int j = 0; j < 4; j++) {
                codigo.append(ALFANUMERICO.charAt(RANDOM.nextInt(ALFANUMERICO.length())));
            }
        }
        return codigo.toString();
    }

}
