package com.example.labsdi.controller;

import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.ShopAveragePriceDTO;
import com.example.labsdi.service.IShopService;
import com.example.labsdi.service.exception.ShopServiceException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ShopController {
    @Autowired
    private IShopService shopService;

    @PostMapping("/shops")
    public Shop addShop(@Valid @RequestBody Shop shop) throws ShopServiceException {
        return shopService.addShop(shop);
    }

    @GetMapping("/shops")
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @PutMapping("/shops/{id}")
    public Shop
    updateShop(@RequestBody Shop shop, @PathVariable("id") Long id) throws ShopServiceException {
        return shopService.updateShop(shop, id);
    }

    @DeleteMapping("/shops/{id}")
    public String removeShop(@PathVariable("id") Long id) throws ShopServiceException {
        shopService.removeShop(id);
        return "Deleted Successfully";
    }

    @GetMapping("/shops/{id}")
    public DTO getShop(@PathVariable("id") Long id) throws ShopServiceException {
        return shopService.getShop(id).toDTO();
    }
    @GetMapping("/shops/orderByAveragePrice")
    public List<ShopAveragePriceDTO> getAllShopsOrderByAverageProductsPrice() {
        return shopService.getAllShopsOrderByAverageProductsPrice();
    }
}
