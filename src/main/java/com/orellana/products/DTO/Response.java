package com.orellana.products.DTO;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.orellana.products.Enums.UserRole;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    //generic
    private int status;
    private String message;
    //for login
    private String token;
    private UserRole role;
    private String expirationTime;

    //for pagination
    private Integer totalPages;
    private Long totalElements;

    //data output optional
    private UserDTO user;
    private List<UserDTO> users;

    // private SupplierDTO supplier;
    // private List<SupplierDTO> suppliers;

    private CategoriaDTO category;
    private List<CategoriaDTO> categories;

    private ProductsDTO product;
    private List<ProductsDTO> products;

    private TransaccionesDTO transaction;
    private List<TransaccionesDTO> transactions;

    private final LocalDateTime timestamp = LocalDateTime.now();
}
