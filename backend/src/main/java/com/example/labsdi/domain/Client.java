package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="client")
public class Client extends UserCreated implements ISimpleDTOConvertable, IDTOConvertable {
    @Column(name="name")
    private String name;
    @Column(name="address")
    private String address;
    @Column(name="email")
    @NotBlank(message = "Email is mandatory")
    @Email
    private String email;
    @Column(name="telephoneNumber")
    private String telephoneNumber;
    @Column(name="birthDate")
    @JsonFormat(pattern = "dd-MM-yyyy")
    @PastOrPresent
    private Date birthDate;

    @Override
    public SimpleDTO toSimpleDTO() {
        SimpleClientDTO scdto = new SimpleClientDTO();
        scdto.setId(id);
        scdto.setName(name);
        return scdto;
    }

    @Override
    public DTO toDTO() {
        return ClientDTO.builder()
                .email(email)
                .telephoneNumber(telephoneNumber)
                .birthDate(birthDate)
                .name(name)
                .user((UserDTO) user.toDTO())
                .id(id)
                .build();
    }
}
