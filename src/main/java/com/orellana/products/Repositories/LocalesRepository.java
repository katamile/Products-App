package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orellana.products.Entities.Locales;

@Repository
public interface LocalesRepository extends JpaRepository<Locales, Long> {
    
}
