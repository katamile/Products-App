package com.orellana.products.Entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.orellana.products.Enums.StatusTransaccion;
import com.orellana.products.Enums.TipoTransaccion;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "transacciones")
public class Transacciones extends crudBase{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTransaccion;

    private Integer totalProductos;

    private BigDecimal totalPrecio;

    @Enumerated(EnumType.STRING)
    private TipoTransaccion tipoTransaccion;

    @Enumerated(EnumType.STRING)
    private StatusTransaccion status;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idLocal")
    private Locales locales;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUser")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idProducto")
    private Products product;

    @Override
    public String toString() {
        return "Transacciones [idTransaccion=" + idTransaccion + ", totalProductos=" + totalProductos + ", totalPrecio="
                + totalPrecio + ", tipoTransaccion=" + tipoTransaccion + ", status=" + status + ", description="
                + description + ", locales=" + locales + ", user=" + user + ", product=" + product + "]";
    }

}
