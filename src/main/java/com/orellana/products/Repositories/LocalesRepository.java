package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orellana.products.Entities.Locales;

public interface LocalesRepository extends JpaRepository<Locales, Long> {
    
}
