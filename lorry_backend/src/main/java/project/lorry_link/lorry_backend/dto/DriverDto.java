package project.lorry_link.lorry_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DriverDto {
	private Long id;
    private String username;
    private String phoneNumber;
    private String aadharNumber;
    private String email;
    private Integer experience;
    private String drivingLicenseFileName;
    private String insuranceFileName;
    private String rcCardNumber;
    private String customVehicleType;
    private String vehicleType;
    private Integer loadCapacityKg;
    private String payemtDetail;
    private String paymentID;
    private String password;
    private Set<String> role;
}

