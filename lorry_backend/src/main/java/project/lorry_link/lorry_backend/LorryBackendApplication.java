package project.lorry_link.lorry_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "project.lorry_link.lorry_backend")
public class LorryBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LorryBackendApplication.class, args);
	}

}
