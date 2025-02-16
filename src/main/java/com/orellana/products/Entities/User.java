package com.orellana.products.Entities;

import java.time.LocalDateTime;
import java.util.List;

import com.orellana.products.Enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Users")
public class User extends crudBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @NotBlank(message = "Nombre es requerido")
    private String nombre;

    @NotBlank(message = "Email es requerido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Password  es requerido")
    private String password;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "Users")
    private List<Transacciones> transactions;

    @Override
    public String toString() {
        return "User [id=" + idUser + ", name=" + nombre + ", email=" + email + ", password=" + password + ", phoneNumber="
                + phoneNumber + ", role=" + role + "]";
    }


    
}
