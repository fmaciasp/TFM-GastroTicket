package uoc.tfm.gastroticket.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import uoc.tfm.gastroticket.jwt.JwtService;
import uoc.tfm.gastroticket.user.Role;
import uoc.tfm.gastroticket.user.User;
import uoc.tfm.gastroticket.user.UserRepository;

@Service
@Transactional
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

    public void enviarEmail(User user, String nombre, String rol) {
        String token = jwtService.getTokenRegistro(user, Role.EMPRESA.toString());
        user.setActivationToken(token);
        userRepository.save(user);
        String url = getBaseUrl();
        url = url.concat("activate?token=");
        url = url.concat(token);
        String htmlContent = "<html><body><h1>¡¡Bienvenido/a a GastroTicket " + nombre + "!!</h1>"
                + "<p>Por favor, haga clic en el siguiente enlace para activar su cuenta:</p>"
                + "<a href=\"" + url + "\">Activar cuenta</a>"
                + "</body></html>";

        try {
            sendEmail(/* _user.getUsername() */"franmacias91@gmail.com",
                    "Active su cuenta en GastroTicket", htmlContent, token);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private void sendEmail(String to, String subject, String text, String token) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        javaMailSender.send(message);
    }

    public String getBaseUrl() {
        // local
        String url = "http://localhost:4200/";
        // produccion
        // String url = "";

        return url;
    }

}
