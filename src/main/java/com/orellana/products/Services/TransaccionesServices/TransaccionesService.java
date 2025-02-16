package com.orellana.products.Services.TransaccionesServices;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.orellana.products.DTO.Response;
import com.orellana.products.DTO.TransaccionRequest;
import com.orellana.products.DTO.TransaccionesDTO;
import com.orellana.products.Entities.Locales;
import com.orellana.products.Entities.Products;
import com.orellana.products.Entities.Transacciones;
import com.orellana.products.Entities.User;
import com.orellana.products.Enums.StatusTransaccion;
import com.orellana.products.Enums.TipoTransaccion;
import com.orellana.products.Exceptions.NameValueRequiredException;
import com.orellana.products.Exceptions.NotFoundException;
import com.orellana.products.Repositories.LocalesRepository;
import com.orellana.products.Repositories.ProductsRepository;
import com.orellana.products.Repositories.TransaccionesRepository;
import com.orellana.products.Services.UserServices.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransaccionesService implements ITransaccionesService { 
    private final TransaccionesRepository transactionRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final ProductsRepository productRepository;
    private final LocalesRepository localesRepository;

    @Override
    public Response restockInventory(TransaccionRequest transactionRequest) {
        Long productId = transactionRequest.getIdProduct();
        Long localId = transactionRequest.getIdLocal();
        Integer quantity = transactionRequest.getQuantity();

        Products product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("No se encuentra el producto"));

        Locales local = localesRepository.findById(localId)
                .orElseThrow(() -> new NotFoundException("No se encuentra el local"));

        User user = userService.getCurrentLoggedInUser();

        // Update stock quantity and re-save
        product.setStock(product.getStock() + quantity);
        productRepository.save(product);

        // Create transaction
        Transacciones transaction = Transacciones.builder()
                .tipoTransaccion(TipoTransaccion.COMPRA)
                .status(StatusTransaccion.COMPLETADO)
                .product(product)
                .user(user)
                .locales(local)
                .totalProductos(quantity)
                .totalPrecio(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(transactionRequest.getDescription())
                .build();

        transactionRepository.save(transaction);

        return Response.builder()
                .status(200)
                .message("Restock transaction completed successfully")
                .build();
    }

    @Override
    public Response sell(TransaccionRequest transactionRequest) {
        Long productId = transactionRequest.getIdProduct();
        Long localId = transactionRequest.getIdLocal();
        Integer quantity = transactionRequest.getQuantity();

        Products product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("No se encuentra el producto"));

        Locales local = localesRepository.findById(localId)
                .orElseThrow(() -> new NotFoundException("No se encuentra el local"));

        User user = userService.getCurrentLoggedInUser();

        // Update stock quantity and re-save
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        // Create transaction
        Transacciones transaction = Transacciones.builder()
                .tipoTransaccion(TipoTransaccion.VENTA)
                .status(StatusTransaccion.COMPLETADO)
                .product(product)
                .user(user)
                .locales(local)
                .totalProductos(quantity)
                .totalPrecio(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(transactionRequest.getDescription())
                .build();

        transactionRepository.save(transaction);

        return Response.builder()
                .status(200)
                .message("Sale transaction completed successfully")
                .build();
    }

    @Override
    public Response returnToSupplier(TransaccionRequest transactionRequest) {
        Long productId = transactionRequest.getIdProduct();
        Long localId = transactionRequest.getIdLocal();
        Integer quantity = transactionRequest.getQuantity();

        Products product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("No se encuentra el producto"));

        Locales local = localesRepository.findById(localId)
                .orElseThrow(() -> new NotFoundException("No se encuentra el local"));

        User user = userService.getCurrentLoggedInUser();

        // Update stock quantity and re-save
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        // Create transaction
        Transacciones transaction = Transacciones.builder()
                .tipoTransaccion(TipoTransaccion.DEVOLUCIONES)
                .status(StatusTransaccion.PROCESANDO)
                .product(product)
                .user(user)
                .locales(local)
                .totalProductos(quantity)
                .totalPrecio(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(transactionRequest.getDescription())
                .build();
                
        transactionRepository.save(transaction);

        return Response.builder()
                .status(200)
                .message("Return to supplier transaction initialized")
                .build();
    }

    @Override
    public Response getAllTransactions(int page, int size, String searchText) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<Transacciones> transactionPage = transactionRepository.searchTransactions(searchText, pageable);

        List<TransaccionesDTO> transactionDTOS = modelMapper.map(transactionPage.getContent(), new TypeToken<List<TransaccionesDTO>>() {}.getType());

        transactionDTOS.forEach(transactionDTO -> {
            transactionDTO.setUser(null);
            transactionDTO.setProduct(null);
            transactionDTO.setLocal(null);
        });

        return Response.builder()
                .status(200)
                .message("Transactions retrieved successfully")
                .transactions(transactionDTOS)
                .build();
    }

    @Override
    public Response getTransactionById(Long id) {
        Transacciones transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction not found"));

        TransaccionesDTO transactionDTO = modelMapper.map(transaction, TransaccionesDTO.class);

        transactionDTO.getUser().setTransactions(null); // Remove user transactions

        return Response.builder()
                .status(200)
                .message("Transaction retrieved successfully")
                .transaction(transactionDTO)
                .build();
    }

    @Override
    public Response getAllTransactionByMonthAndYear(int month, int year, long idLocal) {
        
        // Crear LocalDateTime para el inicio y final del mes
        LocalDateTime startDate = LocalDateTime.of(year, month, 1, 0, 0, 0, 0); // Inicio del mes
        LocalDateTime endDate = startDate.plusMonths(1).minusSeconds(1); // Fin del mes (último segundo)

        // Llamar al repositorio con el rango de fechas
        List<Transacciones> transactions = transactionRepository.findAllByMonthAndYearAndLocal(startDate, endDate, idLocal);

        List<TransaccionesDTO> transactionDTOS = modelMapper.map(transactions, new TypeToken<List<TransaccionesDTO>>() {}.getType());

        transactionDTOS.forEach(transactionDTO -> {
            transactionDTO.setUser(null);
            transactionDTO.setProduct(null);
            transactionDTO.setLocal(null);
        });

        return Response.builder()
                .status(200)
                .message("Transactions for the given month and year retrieved successfully")
                .transactions(transactionDTOS)
                .build();
    }

    @Override
    public Response updateTransactionStatus(Long transactionId, StatusTransaccion transactionStatus) {
        Transacciones existingTransaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new NotFoundException("Transaction not found"));

        existingTransaction.setStatus(transactionStatus);
        existingTransaction.setUpdatedAt(LocalDateTime.now());

        transactionRepository.save(existingTransaction);

        return Response.builder()
                .status(200)
                .message("Transaction status updated successfully")
                .build();
    }
}
