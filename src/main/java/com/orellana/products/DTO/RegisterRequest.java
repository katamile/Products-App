package com.orellana.products.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.orellana.products.Enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Nombre es requerido")
    @JsonProperty("nombre")
    private String nombre;

    @NotBlank(message = "Email es requerido")
    @JsonProperty("email")
    private String email;

    @NotBlank(message = "Password es requerido")
    @JsonProperty("password")
    private String password;

    @JsonProperty("phoneNumber")
    private String phoneNumber;
    
    @JsonProperty("role")
    private UserRole role;
}