package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orellana.products.Entities.Categorias;

@Repository
public interface CategoriasRepository extends JpaRepository<Categorias, Long> {
    
}
