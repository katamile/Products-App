package com.orellana.products.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductsDTO {
    private Long id;
    private Long idCategoria;
    private Long idLocal;

    private String nombre;

    private String codigoBarra;

    private BigDecimal price;

    private Integer stock;

    private String description;

    private String imageUrl;

    private LocalDateTime expiryDate;

    private  LocalDateTime updatedAt;

    private LocalDateTime createdAt;

}
