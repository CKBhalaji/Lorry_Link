package project.lorry_link.lorry_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.lorry_link.lorry_backend.security.JWTUtil;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private JWTUtil jwtUtil;

    @Value("${role.driver}")
    private String roleDriver;

    @Value("{role.goods-owner}")
    private String roleGoodsowner;

    @Value("{role.admin}")
    private String roleAdmin;

        @GetMapping("/protected-data")
    public ResponseEntity<String> getProtectedData(@RequestHeader("Authorization") String token){

        if (token != null && token.startsWith("Bearer ")){
           String jwtToken = token.substring(7);

           try{
               if(jwtUtil.isTokenValid(jwtToken)){
                   String username = jwtUtil.extractUsername(jwtToken);

                   Set<String> roles = jwtUtil.extractRoles(jwtToken);

                   if (roles.contains(roleDriver)){
                       return ResponseEntity.ok("Welcome "+ username + " Here is the "+ roles + "-specific data.");
                   } else if (roles.contains(roleGoodsowner)) {
                       return ResponseEntity.ok("Welcome "+ username + " Here is the "+ roles + "-specific data.");
                   } else if (roles.contains(roleAdmin)) {
                       return ResponseEntity.ok("Welcome "+ username + " Here is the "+ roles + "-specific data.");
                   }
                   else {
                       return ResponseEntity.status(403).body("Acces Denied: No specific role you are in");
                   }
               }
           }catch(Exception ex){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Token");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization Header Missing");
    }
}
