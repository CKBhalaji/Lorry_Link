package project.lorry_link.lorry_backend.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.repository.DriverRepository;

import java.util.stream.Collectors;

@Service
public class DriverDetailService implements UserDetailsService {

    private final DriverRepository driverRepository;

    public DriverDetailService(DriverRepository driverRepository){
        this.driverRepository = driverRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Driver user = driverRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: "+username));
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword());
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),
                user.getRole().stream().map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList()));
    }
}
