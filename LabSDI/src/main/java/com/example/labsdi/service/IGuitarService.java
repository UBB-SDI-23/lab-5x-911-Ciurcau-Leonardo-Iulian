package com.example.labsdi.service;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.service.exception.GuitarServiceException;

import java.util.List;

public interface IGuitarService {
    boolean containsGuitar(Long id);
    Guitar addGuitar(Guitar guitar) throws GuitarServiceException;
    Guitar getGuitar(Long id) throws GuitarServiceException;
    void removeGuitar(Long id) throws GuitarServiceException;
    Guitar updateGuitar(Guitar guitar, Long id) throws GuitarServiceException;
    List<Guitar> getAllGuitars();
    List<Guitar> findByPriceGreaterThan(Integer price);
    void addGuitarsToShop(List<Guitar> guitars, Long id) throws GuitarServiceException;
}
