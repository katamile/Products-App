package com.orellana.products.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orellana.products.Entities.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {

    
}
