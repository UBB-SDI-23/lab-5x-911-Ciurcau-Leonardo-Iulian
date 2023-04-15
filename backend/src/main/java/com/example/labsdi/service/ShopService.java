package com.example.labsdi.service;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.ShopAveragePriceDTO;
import com.example.labsdi.domain.dto.ShowAllShopDTO;
import com.example.labsdi.repository.IShopRepository;
import com.example.labsdi.service.exception.ShopServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ShopService implements IShopService {
    @Autowired
    IShopRepository repository;
    @Override
    public boolean containsShop(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Shop addShop(Shop shop) throws ShopServiceException {
        if (Objects.nonNull(shop.getId()) && containsShop(shop.getId())) {
            throw new ShopServiceException("Shop with id " + shop.getId() + " already exists!");
        }
        return repository.save(shop);
    }

    @Override
    public Shop getShop(Long id) throws ShopServiceException {
        Optional<Shop> shop = repository.findById(id);
        if (shop.isEmpty())
            throw new ShopServiceException("Shop with id " + id + " does not exist!");
        else
            return shop.get();
    }

    @Override
    public List<Shop> getFirst100Shops() {
        return repository.findFirst100By();
    }



    @Override
    public void removeShop(Long id) throws ShopServiceException {
        if (!containsShop(id)) {
            throw new ShopServiceException("Shop with id " + id + " does not exist!");
        }
        repository.deleteById(id);
    }

    @Override
    public Shop updateShop(Shop shop, Long id) throws ShopServiceException {
        Optional<Shop> shopOpt = repository.findById(id);
        if (shopOpt.isEmpty()) {
            throw new ShopServiceException("Shop with id " + id + " does not exist!");
        }
        Shop retrievedShop = shopOpt.get();
        if (Objects.nonNull(shop.getTelephoneNumber()) && !"".equals(shop.getTelephoneNumber()))
            retrievedShop.setTelephoneNumber(shop.getTelephoneNumber());
        if (Objects.nonNull(shop.getName()) && !"".equals(shop.getName()))
            retrievedShop.setName(shop.getName());
        if (Objects.nonNull(shop.getEmail()) && !"".equals(shop.getEmail()))
            retrievedShop.setEmail(shop.getEmail());
        if (Objects.nonNull(shop.getAddress()) && !"".equals(shop.getAddress()))
            retrievedShop.setAddress(shop.getAddress());
        if (Objects.nonNull(shop.getShippingAvailable()))
            retrievedShop.setShippingAvailable(shop.getShippingAvailable());
        if (Objects.nonNull(shop.getCouriers()))
            retrievedShop.setCouriers(shop.getCouriers());
        return repository.save(retrievedShop);
    }

    @Override
    public List<Shop> getAllShops() {
        return new ArrayList<>(repository.findAll());
    }

    @Override
    public Slice<Shop> getShopsPage(Integer page) {
        return repository.findAllBy(PageRequest.of(page, 10));
    }

    @Override
    public Slice<Shop> getShopContainsNamePage(Integer page, String name) {
        return repository.findAllByNameContainingIgnoreCase(PageRequest.of(page, 10), name);
    }

    @Override
    public List<ShopAveragePriceDTO> getAllShopsOrderByAverageProductsPrice() {
        List<ShopAveragePriceDTO> listShop = new ArrayList<>(repository.findAll().stream()
                .map(Shop::toShopAveragePriceDTO)
                .toList());
        listShop.sort(Comparator.comparing(ShopAveragePriceDTO::getAverageProductPrice));
        return listShop;
    }

    @Override
    public List<ShopAveragePriceDTO> getFirst100ShopsOrderByAverageProductsPrice() {
        List<ShopAveragePriceDTO> listShop = new ArrayList<>(repository.findFirst100By().stream()
                .map(Shop::toShopAveragePriceDTO)
                .toList());
        listShop.sort(Comparator.comparing(ShopAveragePriceDTO::getAverageProductPrice));
        return listShop;
    }

    @Override
    public Slice<ShopAveragePriceDTO> getShopsByAveragePricePage(Integer page) {
        return repository.findByOrderByAverageProductPriceFieldDesc(PageRequest.of(page, 10))
                .map(Shop::toShopAveragePriceDTO);
    }

    @Override
    public Shop addCourier(Courier courier, Long id) throws ShopServiceException {
        Optional<Shop> shopOpt = repository.findById(id);
        if (shopOpt.isEmpty()) {
            throw new ShopServiceException("Shop with id " + id + " does not exist!");
        }
        Shop retrievedShop = shopOpt.get();
        if (retrievedShop.getCouriers().stream().anyMatch(c -> c.getId().equals(courier.getId()))) {
            throw new ShopServiceException("Courier is already present in shop!");
        }
        retrievedShop.getCouriers().add(courier);
        return repository.save(retrievedShop);
    }

    @Override
    public Shop removeCourier(Long shopId, Long courierId) throws ShopServiceException {
        Optional<Shop> shopOpt = repository.findById(shopId);
        if (shopOpt.isEmpty()) {
            throw new ShopServiceException("Shop with id " + shopId + " does not exist!");
        }
        Shop retrievedShop = shopOpt.get();
        if (retrievedShop.getCouriers().stream().noneMatch(c -> c.getId().equals(courierId))) {
            throw new ShopServiceException("Courier is not present in shop!");
        }
        retrievedShop.getCouriers().removeIf(c -> Objects.equals(c.getId(), courierId));
        return repository.save(retrievedShop);
    }
}
