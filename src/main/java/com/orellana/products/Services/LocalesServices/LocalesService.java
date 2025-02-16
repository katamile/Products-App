package com.orellana.products.Services.LocalesServices;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.orellana.products.DTO.CategoriaDTO;
import com.orellana.products.DTO.LocalesDTO;
import com.orellana.products.DTO.ProductsDTO;
import com.orellana.products.DTO.Response;
import com.orellana.products.Entities.Categorias;
import com.orellana.products.Entities.Locales;
import com.orellana.products.Entities.Products;
import com.orellana.products.Exceptions.NotFoundException;
import com.orellana.products.Repositories.LocalesRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocalesService implements ILocalesService {
    private final LocalesRepository localesRepository;
    private final ModelMapper modelMapper;

    @Override
    public Response saveLocal(LocalesDTO localesDTO) {
        Locales localToSave = modelMapper.map(localesDTO, Locales.class);
        localesRepository.save(localToSave);

        return Response.builder()
                .status(200)
                .message("Local successfully saved")
                .build();
    }

    @Override
    public Response updateLocal(LocalesDTO localesDTO) {
        Locales existingLocal = localesRepository.findById(localesDTO.getIdLocal())
                .orElseThrow(() -> new NotFoundException("Local Not Found"));

        // Actualiza los campos
        existingLocal.setCodigo(localesDTO.getCodigo());
        existingLocal.setNombre(localesDTO.getNombre());
        existingLocal.setDireccion(localesDTO.getDireccion());
        existingLocal.setCiudad(localesDTO.getCiudad());
        existingLocal.setProvincia(localesDTO.getProvincia());
        existingLocal.setTelefono(localesDTO.getTelefono());

        localesRepository.save(existingLocal);
        return Response.builder()
                .status(200)
                .message("Local successfully updated")
                .build();
    }

    @Override
    public Response getAllLocales() {
        List<Locales> localesList = localesRepository.findAll();
        List<LocalesDTO> localesDTOList = localesList.stream()
                .map(local -> modelMapper.map(local, LocalesDTO.class))
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .message("success")
                .locales(localesDTOList)
                .build();
    }

    @Override
    public Response getLocalById(long id) {
        Locales local = localesRepository.findByIdWithCategoriesAndProducts(id);
        if (local == null) {
            throw new RuntimeException("Local no encontrado con ID: " + id);
        }
    
        LocalesDTO localDTO = modelMapper.map(local, LocalesDTO.class);
            
        return Response.builder()
                .status(200)
                .message("success")
                .local(localDTO)
                .build();
    }

    @Override
        public Response getLocalSucursalProducts(long id) {
        // Recuperamos el local con sus categorías y productos
        Locales local = localesRepository.findByIdWithCategoriesAndProducts(id);
        
        if (local == null) {
                throw new RuntimeException("Local no encontrado con ID: " + id);
        }

        // Mapeamos el local a DTO
        LocalesDTO localDTO = modelMapper.map(local, LocalesDTO.class);
        
        // Convertimos el Set de categorías a una lista de CategoriaDTO
        List<CategoriaDTO> categoriasDTO = new ArrayList<>();
        
        for (Categorias categoria : local.getCategorias()) {
                // Mapear cada categoria a su DTO correspondiente
                CategoriaDTO categoriaDTO = modelMapper.map(categoria, CategoriaDTO.class);
                
                // Convertir el Set de productos a lista de productos (si es necesario)
                List<ProductsDTO> productosDTO = new ArrayList<>();
                for (Products producto : categoria.getProductos()) {
                ProductsDTO productDTO = modelMapper.map(producto, ProductsDTO.class);
                productosDTO.add(productDTO);
                }
                
                // Asignamos la lista de productos a la categoría DTO
                categoriaDTO.setProductos(productosDTO);
                
                // Agregar la categoría al listado de categorías DTO
                categoriasDTO.add(categoriaDTO);
        }
        
        // Asignamos las categorías convertidas a la lista en el DTO de LocalesDTO
        localDTO.setCategorias(categoriasDTO);
        
        return Response.builder()
                .status(200)
                .message("success")
                .local(localDTO)
                .build();
        }


    @Override
    public Response deleteLocal(long id) {
        Locales local = localesRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Local Not Found"));

        localesRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("Local successfully deleted")
                .build();
    }
}
