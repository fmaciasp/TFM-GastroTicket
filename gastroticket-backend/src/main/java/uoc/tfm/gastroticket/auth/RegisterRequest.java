package uoc.tfm.gastroticket.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uoc.tfm.gastroticket.user.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    String username;
    String password;
    String nombre;
    String direccion;
    String apellidos;
    Role role;
    String ciudad;
}
