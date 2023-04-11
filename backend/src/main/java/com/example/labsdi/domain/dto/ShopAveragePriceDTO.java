package com.example.labsdi.domain.dto;

import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopAveragePriceDTO extends ShopDTO {
    private Double averageProductPrice;

    @Builder(builderMethodName = "ShopAveragePriceBuilder")
    public ShopAveragePriceDTO(ShopDTO stdo, Double averageProductPrice) {
        super(stdo.products,  /*stdo.couriers,*/ stdo.id, stdo.name, stdo.address, stdo.email,
                stdo.telephoneNumber, stdo.shippingAvailable);
        this.averageProductPrice = averageProductPrice;
    }
}
