package com.orellana.products.Services.CategoriaServices;

import java.util.List;
import java.util.stream.Collectors;

import com.orellana.products.DTO.CategoriaDTO;
import com.orellana.products.DTO.LocalesDTO;
import com.orellana.products.DTO.Response;
import com.orellana.products.Entities.Categorias;
import com.orellana.products.Entities.Locales;
import com.orellana.products.Repositories.CategoriasRepository;
import com.orellana.products.Repositories.LocalesRepository;
import com.orellana.products.Exceptions.NotFoundException; // Importar la excepción personalizada

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoriaService implements ICategoriaService {
    @Autowired
    private final CategoriasRepository categoryRepository;
    @Autowired
    private final ModelMapper modelMapper;
    @Autowired
    private LocalesRepository localesRepository;

    @Override
    public Response createCategory(CategoriaDTO categoryDTO) {
        // El resto del código permanece igual
        Locales local = localesRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Local no encontrado"));
        
        Categorias categoryToSave = modelMapper.map(categoryDTO, Categorias.class);
        categoryToSave.setLocales(local);
        categoryRepository.save(categoryToSave);
        
        return Response.builder()
                .status(200)
                .message("Categoria creada con éxito")
                .build();
    }
        @Override
        public Response getAllCategories() {
        // Obtener todas las categorías ordenadas por idCategoria de forma descendente
        List<Categorias> categorias = categoryRepository.findAll(Sort.by(Sort.Direction.DESC, "idCategoria"));

        // Mapear la lista de entidades Categorias a una lista de DTOs CategoriaDTO
        List<CategoriaDTO> categoriaDTOS = categorias.stream()
                .map(categoria -> modelMapper.map(categoria, CategoriaDTO.class))
                .collect(Collectors.toList());

        // Construir y retornar la respuesta
        return Response.builder()
                .status(200)
                .message("success")
                .categories(categoriaDTOS) // Asegúrate de que el campo "categories" esté definido en la clase Response
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
