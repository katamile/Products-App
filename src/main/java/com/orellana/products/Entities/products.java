package com.orellana.products.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name= "Productos")
public class products extends crudBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProducts;
    
    private String nombre;
    private String descripcion;
    private double precio;
}
