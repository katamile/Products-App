package com.orellana.products.Services.LocalesServices;

import com.orellana.products.DTO.LocalesDTO;
import com.orellana.products.DTO.Response;

public interface ILocalesService {
    Response saveLocal(LocalesDTO localesDTO);
    Response updateLocal(LocalesDTO localesDTO);
    Response getAllLocales();
    Response getLocalById(long id);
    Response getLocalSucursalProducts(long id);
    Response deleteLocal(long id);
}
