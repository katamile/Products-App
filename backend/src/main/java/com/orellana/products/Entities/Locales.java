package com.orellana.products.Entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "locales")
public class Locales extends crudBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idLocal;
    
    @NotBlank(message = "Codigo es requerido")
    private String codigo;
    
    @NotBlank(message = "Nombre es requerido")
    private String nombre;

    private String direccion;
    private String ciudad;
    private String provincia;
    
    private String telefono;

    @OneToMany(mappedBy = "locales", fetch = FetchType.LAZY)
    private Set<Categorias> categorias = new HashSet<>();

    @Override
    public String toString() {
        return "Locales [idLocal=" + idLocal + ", codigo=" + codigo + ", nombre=" + nombre + ", direccion=" + direccion
                + ", ciudad=" + ciudad + ", provincia=" + provincia + ", telefono=" + telefono + ", categorias="
                + categorias + "]";
    }
}
