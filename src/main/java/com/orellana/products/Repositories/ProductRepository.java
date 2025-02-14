package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orellana.products.Entities.products;

@Repository
public interface ProductRepository extends JpaRepository<products, Long> {
}