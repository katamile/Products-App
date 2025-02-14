package com.orellana.products.DTO;

import lombok.Data;

@Data
public class ProductsDTO {
    private long idProducts;
    private String nombre;
    private String descripcion;
    private double precio;
}
