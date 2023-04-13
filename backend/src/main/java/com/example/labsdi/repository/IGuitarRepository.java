package com.example.labsdi.repository;

import com.example.labsdi.domain.Guitar;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGuitarRepository extends JpaRepository<Guitar, Long> {
    List<Guitar> findByPriceGreaterThan(int price);
    Slice<Guitar> findAllBy(Pageable pageable);
    List<Guitar> findFirst100By();
    List<Guitar> findFirst100ByPriceGreaterThan(int price);
}
