package com.example.labsdi.service;

import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.ShopAveragePriceDTO;
import com.example.labsdi.domain.dto.ShopDTO;
import com.example.labsdi.service.exception.ShopServiceException;

import java.util.List;

public interface IShopService {
    boolean containsShop(Long id);
    Shop addShop(Shop shop) throws ShopServiceException;
    Shop getShop(Long id) throws ShopServiceException;
    void removeShop(Long id) throws ShopServiceException;
    Shop updateShop(Shop shop, Long id) throws ShopServiceException;
    List<Shop> getAllShops();
    List<ShopAveragePriceDTO> getAllShopsOrderByAverageProductsPrice();
}