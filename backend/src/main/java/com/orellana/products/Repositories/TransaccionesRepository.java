package com.orellana.products.Repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.orellana.products.Entities.Transacciones;

@Repository
public interface TransaccionesRepository extends JpaRepository<Transacciones, Long>{
    @Query("SELECT t FROM Transacciones t " +
        "JOIN t.locales l " +
        "WHERE t.createdAt BETWEEN :startDate AND :endDate " +
        "AND l.idLocal = :idLocal")
    List<Transacciones> findAllByMonthAndYearAndLocal(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        @Param("idLocal") Long idLocal
    );

    @Query("SELECT t FROM Transacciones t " +
        "LEFT JOIN t.product p " +
        "LEFT JOIN t.locales l " +
        "WHERE (:searchText IS NULL OR " +
        "LOWER(t.description) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
        "LOWER(t.status) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
        "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
        "LOWER(p.codigoBarra) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
        "LOWER(l.nombre) LIKE LOWER(CONCAT('%', :searchText, '%')))")
    Page<Transacciones> searchTransactions(@Param("searchText") String searchText, Pageable pageable);

}
