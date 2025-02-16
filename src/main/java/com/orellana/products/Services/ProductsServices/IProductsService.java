package com.orellana.products.Services.ProductsServices;

import org.springframework.web.multipart.MultipartFile;

import com.orellana.products.DTO.ProductsDTO;
import com.orellana.products.DTO.Response;

public interface IProductsService {
    Response saveProduct(ProductsDTO productDTO);
    Response updateProduct(ProductsDTO productDTO);
    Response getAllProducts();
    Response getProductById(Long id);
    Response deleteProduct(Long id);
}

