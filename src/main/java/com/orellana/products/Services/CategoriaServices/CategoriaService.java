package com.orellana.products.Services.CategoriaServices;

import java.util.List;

import com.orellana.products.DTO.CategoriaDTO;
import com.orellana.products.DTO.Response;
import com.orellana.products.Entities.Categorias;
import com.orellana.products.Repositories.CategoriasRepository;
import com.orellana.products.Exceptions.NotFoundException; // Importar la excepción personalizada

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoriaService implements ICategoriaService {

    private final CategoriasRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public Response createCategory(CategoriaDTO categoryDTO) {
        Categorias categoryToSave = modelMapper.map(categoryDTO, Categorias.class);
        categoryRepository.save(categoryToSave);

        return Response.builder()
                .status(200)
                .message("Categoria creada con éxito")
                .build();
    }

    @Override
    public Response getAllCategories() {
        List<Categorias> categories = categoryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

        List<CategoriaDTO> categoryDTOS = modelMapper.map(categories, new TypeToken<List<CategoriaDTO>>() {}.getType());

        return Response.builder()
                .status(200)
                .message("success")
                .categories(categoryDTOS)
                .build();
    }

    @Override
    public Response getCategoryById(Long id) {
        Categorias category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria no encontrada"));

        CategoriaDTO categoryDTO = modelMapper.map(category, CategoriaDTO.class);

        return Response.builder()
                .status(200)
                .message("success")
                .category(categoryDTO)
                .build();
    }

    @Override
    public Response updateCategory(Long id, CategoriaDTO categoryDTO) {
        Categorias existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria no encontrada"));

        existingCategory.setNombre(categoryDTO.getNombre());
        categoryRepository.save(existingCategory);

        return Response.builder()
                .status(200)
                .message("Categoria actualizada con éxito")
                .build();
    }

    @Override
    public Response deleteCategory(Long id) {
        categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria no encontrada"));

        categoryRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("Categoria eliminada con éxito")
                .build();
    }
}
