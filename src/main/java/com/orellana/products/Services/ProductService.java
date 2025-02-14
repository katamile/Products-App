package com.orellana.products.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orellana.products.DTO.ProductsDTO;
import com.orellana.products.Entities.products;
import com.orellana.products.Repositories.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<ProductsDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<ProductsDTO> getProductById(Long id) {
        return productRepository.findById(id).map(this::convertToDTO);
    }

    public ProductsDTO saveProduct(ProductsDTO productDTO) {
        products product = convertToEntity(productDTO);
        return convertToDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Métodos para convertir entre DTO y Entity
    private ProductsDTO convertToDTO(products product) {
        ProductsDTO dto = new ProductsDTO();
        dto.setIdProducts(product.getIdProducts());
        dto.setNombre(product.getNombre());
        dto.setDescripcion(product.getDescripcion());
        dto.setPrecio(product.getPrecio());
        return dto;
    }

    private products convertToEntity(ProductsDTO dto) {
        products Product = new products();
        Product.setIdProducts(dto.getIdProducts());
        Product.setNombre(dto.getNombre());
        Product.setDescripcion(dto.getDescripcion());
        Product.setPrecio(dto.getPrecio());
        return Product;
    }
}

