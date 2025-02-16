package com.orellana.products.DTO;

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
    private String nombre;
    @NotBlank(message = "Email es requerido")
    private String email;
    @NotBlank(message = "Password es requerido")
    private String password;
    @NotBlank(message = "Teléfono es requerido")
    private String phoneNumber;
    private UserRole role;
}