package com.example.labsdi.repository;

import com.example.labsdi.domain.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ICourierRepository extends JpaRepository<Courier, Long> {
    List<Courier> findFirst100By();
}
