package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.orellana.products.Entities.Locales;

@Repository
public interface LocalesRepository extends JpaRepository<Locales, Long> {
    @Query("SELECT DISTINCT l FROM Locales l " +
    "LEFT JOIN FETCH l.categorias c " +
    "LEFT JOIN FETCH c.productos " +
    "WHERE l.idLocal = :id")
    Locales findByIdWithCategoriesAndProducts(@Param("id") Long id);
}

