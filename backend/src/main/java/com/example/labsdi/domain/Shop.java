package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.ProductDTO;
import com.example.labsdi.domain.dto.ShopDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop implements IDTOConvertable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Product> products;
    private String name;
    private String address;
    @NotEmpty(message = "Email is mandatory")
    private String email;
    private String telephoneNumber;
    private Boolean shippingAvailable;

    @Builder(builderMethodName = "shopBuilder")
    public Shop(Long id) {
        this.id = id;
    }

    @Override
    public DTO toDTO() {
        ShopDTO shopdto = new ShopDTO();
        shopdto.setId(id);
        shopdto.setName(name);
        shopdto.setAddress(address);
        shopdto.setEmail(email);
        shopdto.setTelephoneNumber(telephoneNumber);
        shopdto.setShippingAvailable(shippingAvailable);
        shopdto.setProducts(products.stream().map(p -> (ProductDTO)p.toDTO()).toList());
        return shopdto;
    }
}
