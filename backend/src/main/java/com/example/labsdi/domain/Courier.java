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

import java.util.List;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="courier")
public class Courier implements IDTOConvertable, ISimpleDTOConvertable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToMany(mappedBy = "couriers", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Shop> shops;
    @Column(name="name")
    private String name;
    @Column(name="address")
    private String address;
    @Column(name="email")
    private String email;
    @Column(name="telephone_number")
    private String telephoneNumber;
    @Column(name="delivery_price")
    private Integer deliveryPrice;
    @Column(name="description")
    private String description;

    @Override
    public DTO toDTO() {
        CourierDTO courierdto = new CourierDTO();
        courierdto.setId(id);
        courierdto.setName(name);
        courierdto.setAddress(address);
        courierdto.setEmail(email);
        courierdto.setTelephoneNumber(telephoneNumber);
        courierdto.setDeliveryPrice(deliveryPrice);
        courierdto.setDescription(description);

        return courierdto;
    }

    @Override
    public SimpleDTO toSimpleDTO() {
        SimpleCourierDTO scourierdto = new SimpleCourierDTO();
        scourierdto.setId(id);
        scourierdto.setName(name);
        return scourierdto;
    }
}
