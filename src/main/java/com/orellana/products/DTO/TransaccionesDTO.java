package com.orellana.products.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.orellana.products.Enums.StatusTransaccion;
import com.orellana.products.Enums.TipoTransaccion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransaccionesDTO {

    private Long idTransaccion;

    private Integer totalProductos;

    private BigDecimal totalPrecio;

    private TipoTransaccion tipoTransaccion;

    private StatusTransaccion status;

    private String description;

    private LocalDateTime updatedAt;

    private LocalDateTime createdAt;

    private UserDTO user;

    private ProductsDTO product;

    private LocalesDTO local;

}
