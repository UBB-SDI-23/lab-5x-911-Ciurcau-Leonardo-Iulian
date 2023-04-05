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

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="shop")
public class Shop implements IDTOConvertable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Product> products;
    @Column(name="name")
    private String name;
    @Column(name="address")
    private String address;
    @Column(name="email")
    @NotEmpty(message = "Email is mandatory")
    private String email;
    @Column(name="telephoneNumber")
    private String telephoneNumber;
    @Column(name="shippingAvailable")
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
