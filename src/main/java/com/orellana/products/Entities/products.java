package com.orellana.products.Entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "products")
public class Products extends crudBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProducto;

    @NotBlank(message = "Nombre es requerido")
    private String nombre;

    @NotBlank(message = "Codigo de barras es requeruido")
    @Column(unique = true)
    private String codigoBarra;

    @Positive(message = "El precio debe ser un número positivo")
    private BigDecimal price;

    @Min(value = 0, message = "El stock no puede ser menor a 0")
    private Integer stock;

    private String description;

    private String imageUrl;

    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private Categorias categorias;

    @ManyToOne
    @JoinColumn(name = "idLocal")
    private Locales locales;

    @Override
    public String toString() {
        return "Products [idProducto=" + idProducto + ", name=" + nombre + ", codigoBarra=" + codigoBarra + ", price="
                + price + ", stock=" + stock + ", description=" + description + ", imageUrl=" + imageUrl
                + ", expiryDate=" + expiryDate + "]";
    }

}