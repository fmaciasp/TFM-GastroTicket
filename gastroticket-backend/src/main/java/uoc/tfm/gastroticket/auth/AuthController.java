package uoc.tfm.gastroticket.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }

    @PostMapping("register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /*
     * @GetMapping("/activate-account")
     * public ResponseEntity<String> activateAccount(@RequestParam("token") String
     * token) {
     * // Decodificar el token para extraer la información del usuario, como el ID
     * de usuario
     * 
     * // Asociar el token con el usuario correspondiente en la base de datos
     * 
     * // Verificar si el token es válido y aún no ha expirado en la base de datos
     * boolean tokenIsInvalidOrExpired;
     * if (tokenIsInvalidOrExpired) {
     * return ResponseEntity.status(HttpStatus.UNAUTHORIZED).
     * body("El enlace de activación es inválido o ha expirado");
     * }
     * return ResponseEntity.ok(response);
     * }
     * 
     * @PostMapping("/activate-account")
     * public String activateAccount(@RequestParam("token") String
     * token, @RequestParam("password") String password) {
     * // Decodificar el token para extraer la información del usuario, como el ID
     * de usuario
     * 
     * // Asociar el token con el usuario correspondiente en la base de datos
     * 
     * // Verificar si el token es válido y aún no ha expirado en la base de datos
     * 
     * if (tokenIsInvalidOrExpired) {
     * // Devolver un mensaje de error al usuario
     * return "El token de activación es inválido o ha expirado.";
     * }
     * 
     * // Actualizar la contraseña del usuario en la base de datos y activar su
     * cuenta
     * 
     * return "¡Su cuenta ha sido activada correctamente!";
     * }
     */

}
