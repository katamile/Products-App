package com.orellana.products.Entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "Categorias")
public class Categorias extends crudBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    @NotBlank(message = "Nombre es requerido")
    @Column(unique = true)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "idLocal")
    private Locales locales;


    @OneToMany(mappedBy = "categorias", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Products> products;


    @Override
    public String toString() {
        return "Categorias [idCategoria=" + idCategoria + ", nombre=" + nombre + ", locales=" + locales + ", products="
                + products + "]";
    }
    
}
