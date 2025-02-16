package com.orellana.products.Services.CategoriaServices;

import com.orellana.products.DTO.CategoriaDTO;
import com.orellana.products.DTO.Response;

public interface ICategoriaService {
    Response createCategory(CategoriaDTO categoriaDTO);
    Response getAllCategories();
    Response getCategoryById(Long id);
    Response updateCategory(Long id, CategoriaDTO categoriaDTO);
    Response deleteCategory(Long id);
}

