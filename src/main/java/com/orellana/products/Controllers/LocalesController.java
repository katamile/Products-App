package com.orellana.products.Controllers;

import com.orellana.products.DTO.LocalesDTO;
import com.orellana.products.DTO.Response;
import com.orellana.products.Services.LocalesServices.ILocalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/locales")
@RequiredArgsConstructor
public class LocalesController {

    private final ILocalesService localesService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> saveLocal(@RequestBody LocalesDTO localesDTO) {
        return ResponseEntity.ok(localesService.saveLocal(localesDTO));
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateLocal(@RequestBody LocalesDTO localesDTO) {
        return ResponseEntity.ok(localesService.updateLocal(localesDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllLocales() {
        return ResponseEntity.ok(localesService.getAllLocales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getLocalById(@PathVariable long id) {
        return ResponseEntity.ok(localesService.getLocalById(id));
    }
    @GetMapping("/getLocalesCategorias/{id}")
    public ResponseEntity<Response> getLocalSucursalProducts(@PathVariable long id) {
        return ResponseEntity.ok(localesService.getLocalSucursalProducts(id));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteLocal(@PathVariable long id) {
        return ResponseEntity.ok(localesService.deleteLocal(id));
    }
}
