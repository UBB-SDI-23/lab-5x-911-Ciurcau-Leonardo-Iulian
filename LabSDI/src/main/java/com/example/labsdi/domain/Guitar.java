package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.GuitarDTO;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guitar extends Product {
    private Integer creationYear;
    private String model;
    private String type;
    private String color;

    @Builder(builderMethodName = "guitarBuilder")
    public Guitar(Long id, Shop shop, Integer price, Integer creationYear,
                  String model, String type, String color) {
        this.id = id;
        this.shop = shop;
        this.price = price;
        this.creationYear = creationYear;
        this.model = model;
        this.type = type;
        this.color = color;
    }

    @Builder(builderMethodName = "guitarBuilder2")
    public Guitar(Integer price, Integer creationYear,
                  String model, String type, String color) {
        this.price = price;
        this.creationYear = creationYear;
        this.model = model;
        this.type = type;
        this.color = color;
    }

    @Override
    public DTO toDTO() {
        GuitarDTO gdto = new GuitarDTO();
        gdto.setId(id);
        gdto.setType(type);
        gdto.setColor(color);
        gdto.setPrice(price);
        gdto.setModel(model);
        gdto.setCreationYear(creationYear);
        gdto.setShopId(shop.getId());
        return gdto;
    }
}
