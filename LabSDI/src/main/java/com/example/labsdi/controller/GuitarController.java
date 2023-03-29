package com.example.labsdi.controller;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.dto.ProductDTO;
import com.example.labsdi.service.IGuitarService;
import com.example.labsdi.service.exception.GuitarServiceException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GuitarController {
    @Autowired
    private IGuitarService guitarService;

    @PostMapping("/guitars")
    public Guitar addGuitar(@Valid @RequestBody Guitar guitar) throws GuitarServiceException {
        return guitarService.addGuitar(guitar);
    }

    @GetMapping("/guitars")
    public List<ProductDTO> getAllGuitars() {
        return guitarService.getAllGuitars().stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @PutMapping("/guitars/{id}")
    public Guitar
    updateGuitar(@RequestBody Guitar guitar, @PathVariable("id") Long id) throws GuitarServiceException {
        return guitarService.updateGuitar(guitar, id);
    }

    @DeleteMapping("/guitars/{id}")
    public String removeGuitar(@PathVariable("id") Long id) throws GuitarServiceException {
        guitarService.removeGuitar(id);
        return "Deleted Successfully";
    }

    @GetMapping("/guitars/priceGreaterThan/{price}")
    public List<Guitar> findByPriceGreaterThan(@PathVariable("price") Integer price) {
        return guitarService.findByPriceGreaterThan(price);
    }

    @GetMapping("/guitars/{id}")
    public Guitar getGuitar(@PathVariable("id") Long id) throws GuitarServiceException {
        return guitarService.getGuitar(id);
    }

    @PostMapping("/shops/{id}/guitars")
    public String addGuitarsToShop(@RequestBody List<Guitar> guitars, @PathVariable("id") Long id) throws GuitarServiceException {
        guitarService.addGuitarsToShop(guitars, id);
        return "Updated successfully";
    }
}
