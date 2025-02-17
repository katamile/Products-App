package com.orellana.products.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransaccionRequest {

    @Positive(message = "Producto es requerido")
    private Long idProduct;

    @Positive(message = "Cantidad es requerido")
    private Integer quantity;

    private long idLocal;

    private String  description;
}
