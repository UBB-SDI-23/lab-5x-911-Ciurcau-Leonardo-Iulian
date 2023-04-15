package com.example.labsdi.controller;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.*;
import com.example.labsdi.service.IShopService;
import com.example.labsdi.service.exception.ShopServiceException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
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

    @GetMapping("/shops/all")
    public List<ShopDTO> getAllShops() {
        return shopService.getAllShops().stream()
                .map(s -> (ShopDTO)s.toDTO())
                .toList();
    }

    @GetMapping("/shops/page/{page}")
    public Slice<ShowAllShopDTO> getShopPage(@PathVariable("page") Integer page) {
        return shopService.getShopsPage(page)
                .map(s -> (ShowAllShopDTO) s.toShowAllDTO());
    }

    @GetMapping("/shops/simple/page/{page}")
    public Slice<SimpleShopDTO> getSimpleShopPage(@PathVariable("page") Integer page) {
        return shopService.getShopsPage(page)
                .map(s -> (SimpleShopDTO)s.toSimpleDTO());
    }

    @GetMapping("/shops/containsName/{name}/page/{page}")
    public Slice<SimpleShopDTO> getShopContainsNamePage(@PathVariable("name") String name,
                                                        @PathVariable("page") Integer page) {
        return shopService.getShopContainsNamePage(page, name)
                .map(s -> (SimpleShopDTO) s.toSimpleDTO());
    }

    @GetMapping("/shops")
    public List<ShopDTO> getFirst100Shops() {
        return shopService.getFirst100Shops().stream()
                .map(s -> (ShopDTO)s.toDTO())
                .toList();
    }

    @PutMapping("/shops/{id}")
    public Shop
    updateShop(@RequestBody Shop shop, @PathVariable("id") Long id) throws ShopServiceException {
        return shopService.updateShop(shop, id);
    }

    @PutMapping("/shops/{id}/addCourier")
    public Shop addCourier(@RequestBody Courier courier, @PathVariable("id") Long id) throws ShopServiceException {
        return shopService.addCourier(courier, id);
    }

    @DeleteMapping("/shops/{shopId}/removeCourier/{courierId}")
    public Shop removeCourier(@PathVariable("shopId") Long shopId,
                                @PathVariable("courierId") Long courierId) throws ShopServiceException {
        return shopService.removeCourier(shopId, courierId);
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

    @GetMapping("/shops/orderByAveragePrice/all")
    public List<ShopAveragePriceDTO> getAllShopsOrderByAverageProductsPrice() {
        return shopService.getAllShopsOrderByAverageProductsPrice();
    }

    @GetMapping("/shops/orderByAveragePrice")
    public List<ShopAveragePriceDTO> getFirst100ShopsOrderByAverageProductsPrice() {
        return shopService.getFirst100ShopsOrderByAverageProductsPrice();
    }

    @GetMapping("/shops/orderByAveragePrice/page/{page}")
    public Slice<ShopAveragePriceDTO> getShopsByAvgPricePage(@PathVariable("page") Integer page) {
        return shopService.getShopsByAveragePricePage(page);
    }
}
