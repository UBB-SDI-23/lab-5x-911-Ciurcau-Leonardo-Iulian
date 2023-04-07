package com.example.labsdi.repository;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.Guitar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IClientRepository extends JpaRepository<Client, Long> {
    List<Client> findFirst100By();
}
