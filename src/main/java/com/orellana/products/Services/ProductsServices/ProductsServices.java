package com.orellana.products.Services.ProductsServices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.orellana.products.DTO.ProductsDTO;
import com.orellana.products.DTO.Response;
import com.orellana.products.Entities.Categorias;
import com.orellana.products.Entities.Products;
import com.orellana.products.Exceptions.NotFoundException;
import com.orellana.products.Repositories.CategoriasRepository;
import com.orellana.products.Repositories.ProductsRepository;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductsServices implements IProductsService {
    private final ProductsRepository productRepository;
    private final ModelMapper modelMapper;
    private final CategoriasRepository categoryRepository;

    @Override
    public Response saveProduct(ProductsDTO productDTO) {
        // Verificar existencia de la categoría
        Categorias category = categoryRepository.findById(productDTO.getIdCategoria())
                .orElseThrow(() -> new NotFoundException("Category Not Found"));

        // Mapear DTO a entidad
        Products productToSave = Products.builder()
                .nombre(productDTO.getNombre())
                .codigoBarra(productDTO.getCodigoBarra())
                .price(productDTO.getPrice())
                .stock(productDTO.getStock())
                .description(productDTO.getDescription())
                .imageUrl(productDTO.getImageUrl())
                .categorias(category)
                .build();

        // Guardar el producto en la base de datos
        productRepository.save(productToSave);
        return Response.builder()
                .status(200)
                .message("Product successfully saved")
                .build();
    }


    @Override
    public Response updateProduct(ProductsDTO productDTO) {
        Products existingProduct = productRepository.findById(productDTO.getIdProducto())
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        // Actualizar la imagen solo si se proporciona una URL
        if (productDTO.getImageUrl() != null && !productDTO.getImageUrl().isEmpty()) {
            existingProduct.setImageUrl(productDTO.getImageUrl());
        }

        // Actualizar categoría si es proporcionada
        if (productDTO.getIdCategoria() != null && productDTO.getIdCategoria() > 0) {
            Categorias category = categoryRepository.findById(productDTO.getIdCategoria())
                    .orElseThrow(() -> new NotFoundException("Category Not Found"));
            existingProduct.setCategorias(category);
        }

        // Actualizar los demás campos solo si se proporcionan
        if (productDTO.getNombre() != null && !productDTO.getNombre().isBlank()) {
            existingProduct.setNombre(productDTO.getNombre());
        }

        if (productDTO.getCodigoBarra() != null && !productDTO.getCodigoBarra().isBlank()) {
            existingProduct.setCodigoBarra(productDTO.getCodigoBarra());
        }

        if (productDTO.getDescription() != null && !productDTO.getDescription().isBlank()) {
            existingProduct.setDescription(productDTO.getDescription());
        }

        if (productDTO.getPrice() != null && productDTO.getPrice().compareTo(BigDecimal.ZERO) >= 0) {
            existingProduct.setPrice(productDTO.getPrice());
        }

        if (productDTO.getStock() != null && productDTO.getStock() >= 0) {
            existingProduct.setStock(productDTO.getStock());
        }

        // Guardar la actualización en la base de datos
        productRepository.save(existingProduct);
        return Response.builder()
                .status(200)
                .message("Product successfully updated")
                .build();
    }


    @Override
    public Response getAllProducts() {
        List<Products> products = productRepository.findAll(Sort.by(Sort.Direction.DESC, "idProducto"));
        List<ProductsDTO> productDTOS = modelMapper.map(products, new TypeToken<List<ProductsDTO>>() {}.getType());

        return Response.builder()
                .status(200)
                .message("success")
                .products(productDTOS)
                .build();
    }

    @Override
    public Response getProductById(Long id) {
        Products product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        return Response.builder()
                .status(200)
                .message("success")
                .product(modelMapper.map(product, ProductsDTO.class))
                .build();
    }

    @Override
    public Response deleteProduct(Long id) {
        productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        productRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("Product successfully deleted")
                .build();
    }

}
