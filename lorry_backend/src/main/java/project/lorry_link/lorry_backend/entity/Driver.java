package project.lorry_link.lorry_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Data
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="user_name")
    private String username;

    @Column(name="phone_number", nullable = false ,unique = true)
    private String phoneNumber;

    @Column(name="aadhar_number", nullable = false ,unique = true)
    private String aadharNumber;
    
    @Column(name="email")
    private String email;

    @Column(name="experience")
    private Integer experience;

    @Column(name="driving_licence")
    private String drivingLicenseFileName;

    @Column(name="insurence")
    private String insuranceFileName;

    @Column(name="rc_card")
    private String rcCardNumber;
    
    // Vehicle Info
    @Column(name="cust_vehicle_name")
    private String customVehicleType;
    
    @Column(name="vehicle_type")
    private String vehicleType;
    
    @Column(name="load_capacity")
    private Integer loadCapacityKg;

    // Payment Details
    @Column(name="payment_detail")
    private String payemtDetail;
    
    @Column(name="payment_id")
    private String paymentID;
    
    @Column(name="password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<Role> role = new HashSet<>();

    // Getters and Setters (Lombok @Data annotation handles this)
}
