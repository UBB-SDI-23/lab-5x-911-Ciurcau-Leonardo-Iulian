package com.example.labsdi.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="user_profile")
public class UserProfile {
    @Id
    @OneToOne
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull(message = "User is mandatory")
    private User user;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="address")
    private String address;
    @Column(name="telephone_number")
    private String telephoneNumber;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @Column(name="birth_date")
    private Date birthDate;
}
