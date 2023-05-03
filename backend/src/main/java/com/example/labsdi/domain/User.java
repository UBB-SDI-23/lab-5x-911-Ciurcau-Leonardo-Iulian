package com.example.labsdi.domain;

import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.UserDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_table", indexes = @Index(name = "user_username_index", columnList = "username"))
public class User implements UserDetails, IDTOConvertable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_table_generator")
    @SequenceGenerator(name = "user_table_generator", sequenceName = "user_table_seq")
    private Long id;
    @Column(name="username", nullable = false)
    @NotBlank
    private String username;
    @Column(name="password", nullable = false)
    @NotBlank
    private String password;
    @Column(name="email", nullable = false)
    @NotBlank
    @Email
    private String email;
    @Column(name="confirmation_code", length = 8)
    private String confirmationCode;
    @Column(name="confirmation_code_set_time")
    private Long confirmationCodeSetTime;
    @Column(name="isEnabled", nullable = false)
    @NotNull
    private Boolean isEnabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    @Override
    public DTO toDTO() {
        return new UserDTO(username);
    }
}
