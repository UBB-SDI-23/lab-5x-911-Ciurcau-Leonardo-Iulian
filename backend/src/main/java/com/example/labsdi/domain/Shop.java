package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="shop")
public class Shop implements IDTOConvertable, ISimpleDTOConvertable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Product> products;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "shop_courier",
            joinColumns = @JoinColumn(name = "shop_id", referencedColumnName = "id"),
            foreignKey = @ForeignKey(name="fk_courier_id",
                    foreignKeyDefinition = "FOREIGN KEY (courier_id) REFERENCES courier(id) ON DELETE CASCADE"),
            inverseJoinColumns = @JoinColumn(name = "courier_id", referencedColumnName = "id"),
            inverseForeignKey = @ForeignKey(name="fk_shop_id",
                    foreignKeyDefinition = "FOREIGN KEY (shop_id) REFERENCES shop(id) ON DELETE CASCADE"))
    //@JsonIgnore
    private List<Courier> couriers;
    @Column(name="name")
    private String name;
    @Column(name="address")
    private String address;
    @Column(name="email")
    @NotEmpty(message = "Email is mandatory")
    private String email;
    @Column(name="telephone_number")
    private String telephoneNumber;
    @Column(name="shipping_available")
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

        shopdto.setCouriers(couriers.stream().map(c -> (SimpleCourierDTO) c.toSimpleDTO()).toList());
        shopdto.setProducts(products.stream().map(p -> (SimpleGuitarDTO) p.toSimpleDTO()).toList());
        return shopdto;
    }

    @Override
    public SimpleDTO toSimpleDTO() {
        SimpleShopDTO sshopdto = new SimpleShopDTO();
        sshopdto.setId(id);
        sshopdto.setName(name);
        return sshopdto;
    }
}
