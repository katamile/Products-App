package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orellana.products.Entities.Products;

public interface ProductsRepository extends JpaRepository<Products, Long> {

    
}
