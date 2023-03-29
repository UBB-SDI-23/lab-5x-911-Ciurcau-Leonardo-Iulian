package com.example.labsdi.repository;

import com.example.labsdi.domain.Guitar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGuitarRepository extends JpaRepository<Guitar, Long> {
    List<Guitar> findByPriceGreaterThan(int price);
}
