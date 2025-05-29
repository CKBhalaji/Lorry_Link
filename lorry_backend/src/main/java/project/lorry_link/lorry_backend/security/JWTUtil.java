package project.lorry_link.lorry_backend.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.entity.Role;
import project.lorry_link.lorry_backend.repository.DriverRepository;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JWTUtil {

    private static final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    private final int jwtExpirationMs = 86400000;

    private DriverRepository driverRepository;

    public JWTUtil(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public String generateToken(String username) {
        Optional<Driver> driver = driverRepository.findByUsername(username);
        Set<Role> roles = driver.get().getRole();

        return Jwts.builder().setSubject(username).claim("roles", roles.stream()
                        .map(role -> role.getName()).collect(Collectors.joining(",")))
                .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(secretKey).compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJwt(token).getBody().getSubject();
    }

    public Set<String> extractRoles(String token) {
        String roleString = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJwt(token)
                .getBody().get("roles", String.class);
        return Set.of(roleString);
    }

    public boolean isTokenValid(String token){

        try{
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJwt(token);
            return true;
        }catch(JwtException | IllegalArgumentException e){
            return false;
        }
    }

}

