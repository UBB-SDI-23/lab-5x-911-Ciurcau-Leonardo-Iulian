package com.example.labsdi;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Product;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.domain.dto.ShopAveragePriceDTO;
import com.example.labsdi.domain.dto.ShopDTO;
import com.example.labsdi.repository.IShopRepository;
import com.example.labsdi.service.IShopService;
import com.example.labsdi.service.ShopService;
import com.example.labsdi.service.exception.ShopServiceException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
public class ShopServiceTests {
    @TestConfiguration
    static class ShopServiceTestsContextConfiguration {
        @Bean
        public IShopService shopService() {
            return new ShopService();
        }
    }

    @Autowired
    private IShopService service;
    @MockBean
    private IShopRepository repository;

    @Before
    public void setUp() {
        List<Product> products = List.of(new Guitar(1L, null, 2000, 2001,
                        "model1", "type1", "color1"),
                new Guitar(2L, null, 3000, 2002,
                        "model2", "type2", "color2"),
                new Guitar(3L, null, 100, 2003,
                        "model3", "type3", "color3")
        );
        List<Shop> shops = List.of(new Shop(1L, products.subList(0, 1), null, "shop1", "address1",
                        "1@1.com", "1111", true,0d),
                new Shop(2L, products.subList(1, 3), null, "shop2", "address2",
                        "2@2.com", "2222", true,0d),
                new Shop(3L, List.of(), null, "shop3", "address3",
                        "3@3.com", "3333", true,0d)
        );

        products.get(0).setShop(shops.get(0));
        products.get(1).setShop(shops.get(1));
        products.get(2).setShop(shops.get(1));

        when(repository.findAll())
                .thenReturn(shops);
    }

    @Test
    public void getAllShopsOrderByAverageProductsPriceTest() {
        List<ShopAveragePriceDTO> shopsDTO = service.getAllShopsOrderByAverageProductsPrice();

        assertEquals(2000 ,shopsDTO.get(2).getAverageProductPrice());
        assertEquals(1550, shopsDTO.get(1).getAverageProductPrice());
        assertEquals(0, shopsDTO.get(0).getAverageProductPrice());
    }
}
