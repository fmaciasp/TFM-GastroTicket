package uoc.tfm.ticketrestaurant.cupones.service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uoc.tfm.ticketrestaurant.cupones.model.CuponesDTO;
import uoc.tfm.ticketrestaurant.cupones.repository.CuponesRepository;

@Service
@Transactional
public class CuponesService {

    @Autowired
    CuponesRepository cuponRepo;

    private static final String ALFANUMERICO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public List<CuponesDTO> getCupones() {
        return cuponRepo.findAll();
    }

    public CuponesDTO getById(long id) {
        return cuponRepo.findById(id).orElse(null);
    }

    public void createCupon(long empleadoId) {
        // getEmpresaId
        long empresaId = 1;
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

    private StringBuilder generarCodigo() {
        StringBuilder codigo = new StringBuilder();
        boolean existe = true;

        // while(existe){
        for (int i = 0; i < 4; i++) { // 4 segmentos
            if (i > 0) {
                codigo.append("-");
            }
            for (int j = 0; j < 4; j++) {
                codigo.append(ALFANUMERICO.charAt(RANDOM.nextInt(ALFANUMERICO.length())));
            }
        }

        // comprobar si el código existe
        // }

        return codigo;
    }

    public void canjear(Long id) {

        @SuppressWarnings("null")
        Optional<CuponesDTO> cuponDto = cuponRepo.findById(id);
        if (cuponDto.isPresent()) {
            CuponesDTO _cuponDto = cuponDto.get();
            _cuponDto.setCanjeado(true);
            cuponRepo.save(_cuponDto);
        }

    }

}
