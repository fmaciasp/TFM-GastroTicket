package uoc.tfm.gastroticket.cupones.service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uoc.tfm.gastroticket.cupones.model.CuponesDTO;
import uoc.tfm.gastroticket.cupones.repository.CuponesRepository;
import uoc.tfm.gastroticket.empleados.repository.EmpleadosRepository;
import uoc.tfm.gastroticket.empresas.repository.EmpresasRepository;

@Service
@Transactional
public class CuponesService {

    @Autowired
    CuponesRepository cuponRepo;

    @Autowired
    EmpresasRepository empresaRepo;

    @Autowired
    EmpleadosRepository empleadoRepo;

    private static final String ALFANUMERICO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public List<CuponesDTO> getCupones() {
        return cuponRepo.findAll();
    }

    public CuponesDTO getById(long id) {
        return cuponRepo.findById(id).orElse(null);
    }

    public List<CuponesDTO> getByRestauranteId(long restauranteId) {
        return cuponRepo.findByRestauranteId(restauranteId);
    }

    public void eliminarCupones(List<CuponesDTO> cupones) {
        for (CuponesDTO cupon : cupones) {
            cuponRepo.delete(cupon);
        }
    }

    public void createCupon(long empleadoId, long empresaId) {

        String codigo = generarCodigo().toString();
        Date hoy = new Date();
        Calendar _calendar = Calendar.getInstance();
        _calendar.setTime(hoy);
        _calendar.add(Calendar.DAY_OF_MONTH, 7);

        CuponesDTO _cupon = new CuponesDTO();
        _cupon.setEmpleadoId(empleadoId);
        _cupon.setEmpresaId(empresaId);
        _cupon.setCodigo(codigo);
        _cupon.setFechaFin(_calendar.getTime());
        cuponRepo.save(_cupon);
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

    public void canjear(Long id, Long restauranteId) {

        @SuppressWarnings("null")
        Optional<CuponesDTO> cuponDto = cuponRepo.findById(id);
        if (cuponDto.isPresent()) {
            CuponesDTO _cuponDto = cuponDto.get();
            _cuponDto.setCanjeado(true);
            _cuponDto.setRestauranteId(restauranteId);
            cuponRepo.save(_cuponDto);
        }
    }

}
