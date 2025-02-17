package com.orellana.products.DTO;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocalesDTO {

    private long id;

    @NotBlank(message = "Codigo es requerido")
    private String codigo;

    @NotBlank(message = "Nombre es requerido")
    private String nombre;

    private String direccion;
    private String ciudad;
    private String provincia;
    private String telefono;

    // private List<CategoriaDTO> categorias;
}
