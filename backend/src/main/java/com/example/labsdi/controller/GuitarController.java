package com.example.labsdi.controller;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.dto.ProductDTO;
import com.example.labsdi.service.IGuitarService;
import com.example.labsdi.service.exception.GuitarServiceException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GuitarController {
    @Autowired
    private IGuitarService guitarService;

    @GetMapping("/guitars")
    public List<ProductDTO> getFirst100Guitars() {
        return guitarService.getFirst100Guitars().stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/all")
    public List<ProductDTO> getAllGuitars() {
        return guitarService.getAllGuitars().stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/page/{page}")
    public Slice<ProductDTO> getGuitarsPage(@PathVariable("page") Integer page) {
        return guitarService.getGuitarsPage(page)
                .map(g -> (ProductDTO)g.toDTO());
    }

    @GetMapping("/guitars/priceGreaterThan/{price}/all")
    public List<ProductDTO> findByPriceGreaterThan(@PathVariable("price") Integer price) {
        return guitarService.findByPriceGreaterThan(price).stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/containsName/{name}/page/{page}")
    public Slice<ProductDTO> getGuitarContainsNamePage(@PathVariable("name") String name,
                                                       @PathVariable("page") Integer page) {
        return guitarService.getGuitarContainsNamePage(name, page)
                .map(g -> (ProductDTO) g.toDTO());
    }

    @GetMapping("/guitars/priceGreaterThan/{price}")
    public List<ProductDTO> findFirst100ByPriceGreaterThan(@PathVariable("price") Integer price) {
        return guitarService.findFirst100ByPriceGreaterThan(price).stream()
                .map(g -> (ProductDTO)g.toDTO())
                .toList();
    }

    @GetMapping("/guitars/priceGreaterThan/{price}/page/{page}")
    public Slice<ProductDTO> findByPriceGreaterThanPage(@PathVariable("price") Integer price,
                                                       @PathVariable("page") Integer page) {
        return guitarService.findByPriceGreaterThanPage(price, page)
                .map(g -> (ProductDTO)g.toDTO());
    }

    @GetMapping("/guitars/{id}")
    public Guitar getGuitar(@PathVariable("id") Long id) throws GuitarServiceException {
        return guitarService.getGuitar(id);
    }

    @PostMapping("/guitars")
    public Guitar addGuitar(@Valid @RequestBody Guitar guitar) throws GuitarServiceException {
        return guitarService.addGuitar(guitar);
    }

    @PostMapping("/shops/{id}/guitars")
    public String addGuitarsToShop(@RequestBody List<Guitar> guitars, @PathVariable("id") Long id) throws GuitarServiceException {
        guitarService.addGuitarsToShop(guitars, id);
        return "Updated successfully";
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
}
