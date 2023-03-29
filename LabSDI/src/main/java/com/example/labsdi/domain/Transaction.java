package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.ProductDTO;
import com.example.labsdi.domain.dto.TransactionDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction implements IDTOConvertable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    private Product product;
    @ManyToOne
    private Client client;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @PastOrPresent(message = "Transaction date must be up until the current date")
    private Date date;
    private Boolean isCashPayment;

    @Override
    public DTO toDTO() {
        TransactionDTO tdto = new TransactionDTO();
        tdto.setId(id);
        tdto.setProduct((ProductDTO)product.toDTO());
        tdto.setClient(client);
        tdto.setDate(date);
        tdto.setIsCashPayment(isCashPayment);
        return tdto;
    }
}
