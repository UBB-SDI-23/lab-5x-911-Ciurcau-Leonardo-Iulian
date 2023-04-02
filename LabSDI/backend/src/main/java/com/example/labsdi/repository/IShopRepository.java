package com.example.labsdi.repository;

import com.example.labsdi.domain.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IShopRepository extends JpaRepository<Shop, Long> {
}
