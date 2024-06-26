package uoc.tfm.gastroticket.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String email);

    User findByActivationToken(String token);
}
