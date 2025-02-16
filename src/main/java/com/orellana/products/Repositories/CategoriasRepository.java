package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orellana.products.Entities.Categorias;

public interface CategoriasRepository extends JpaRepository<Categorias, Long> {
    
}
