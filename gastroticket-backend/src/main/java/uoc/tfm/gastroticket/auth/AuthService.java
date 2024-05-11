package uoc.tfm.gastroticket.auth;

import javax.management.RuntimeErrorException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import uoc.tfm.gastroticket.empresas.model.EmpresasDTO;
import uoc.tfm.gastroticket.empresas.repository.EmpresasRepository;
import uoc.tfm.gastroticket.jwt.JwtService;
import uoc.tfm.gastroticket.restaurantes.model.RestaurantesDTO;
import uoc.tfm.gastroticket.restaurantes.repository.RestaurantesRepository;
import uoc.tfm.gastroticket.user.User;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final EmpresasRepository empresaRepository;
    private final RestaurantesRepository restauranteRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.getToken(user);

            return AuthResponse.builder()
                    .token(token)
                    .role(user.getRole())
                    .id(user.getId())
                    .build();
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Correo electrónico o contraseña incorrectos");
        }
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.username)
                .password(passwordEncoder.encode(request.password))
                .role(request.role)
                .build();

        User _user = userRepository.save(user);

        String _role = request.role.toString();

        if (_role.equals("EMPRESA")) {
            EmpresasDTO empresa = new EmpresasDTO();
            empresa.setNombre(request.nombre);
            empresa.setEmail(request.username);
            empresa.setUserId(_user.getId());
            empresaRepository.save(empresa);
        } else if (_role.equals("RESTAURANTE")) {
            RestaurantesDTO restaurante = new RestaurantesDTO();
            restaurante.setNombre(request.nombre);
            restaurante.setCorreo(request.username);
            restaurante.setDireccion(request.direccion);
            restaurante.setCiudad(request.ciudad);
            restaurante.setUserId(_user.getId());
            restauranteRepository.save(restaurante);
        }

        return AuthResponse.builder().token(jwtService.getToken(user)).role(user.getRole()).build();
    }

}
