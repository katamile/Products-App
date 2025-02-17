package com.orellana.products.Services.TransaccionesServices;

import com.orellana.products.DTO.Response;
import com.orellana.products.DTO.TransaccionRequest;
import com.orellana.products.Enums.StatusTransaccion;

public interface ITransaccionesService {
    Response restockInventory(TransaccionRequest transactionRequest);
    Response sell(TransaccionRequest transactionRequest);
    Response returnToSupplier(TransaccionRequest transactionRequest);
    Response getAllTransactions(int page, int size, String searchText);
    Response getTransactionById(Long id);
    Response getAllTransactionByMonthAndYear(int month, int year, long idLocal);
    Response updateTransactionStatus(Long transactionId, StatusTransaccion transactionStatus);
}
