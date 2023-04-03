package com.example.labsdi.service;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Shop;
import com.example.labsdi.repository.IGuitarRepository;
import com.example.labsdi.service.exception.GuitarServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GuitarService implements IGuitarService {
    @Autowired
    private IGuitarRepository repository;

    @Override
    public boolean containsGuitar(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Guitar addGuitar(Guitar guitar) throws GuitarServiceException {
        if (Objects.nonNull(guitar.getId()) && containsGuitar(guitar.getId())) {
            throw new GuitarServiceException("Guitar with id " + guitar.getId() + " already exists!");
        }
        return repository.save(guitar);
    }

    @Override
    public Guitar getGuitar(Long id) throws GuitarServiceException {
        Optional<Guitar> guitar = repository.findById(id);
        if (guitar.isEmpty())
            throw new GuitarServiceException("Guitar with id " + id + " does not exist!");
        else
            return guitar.get();
    }

    @Override
    public void removeGuitar(Long id) throws GuitarServiceException {
        if (!containsGuitar(id)) {
            throw new GuitarServiceException("Guitar with id " + id + " does not exist!");
        }
        repository.deleteById(id);
    }

    @Override
    public Guitar updateGuitar(Guitar guitar, Long id) throws GuitarServiceException {
        Optional<Guitar> guitarOpt = repository.findById(id);
        if (guitarOpt.isEmpty()) {
            throw new GuitarServiceException("Guitar with id " + id + " does not exist!");
        }
        Guitar retrievedGuitar = guitarOpt.get();
        if (Objects.nonNull(guitar.getShop()))
            retrievedGuitar.setShop(guitar.getShop());
        if (Objects.nonNull(guitar.getPrice()) && guitar.getPrice() != -1)
            retrievedGuitar.setPrice(guitar.getPrice());
        if (Objects.nonNull(guitar.getCreationYear()) && guitar.getCreationYear() != -1)
            retrievedGuitar.setCreationYear(guitar.getCreationYear());
        if (Objects.nonNull(guitar.getModel()) && !"".equals(guitar.getModel()))
            retrievedGuitar.setModel(guitar.getModel());
        if (Objects.nonNull(guitar.getType()) && !"".equals(guitar.getType()))
            retrievedGuitar.setType(guitar.getType());
        if (Objects.nonNull(guitar.getColor()) && !"".equals(guitar.getColor()))
            retrievedGuitar.setColor(guitar.getColor());
        return repository.save(retrievedGuitar);
    }

    @Override
    public List<Guitar> getAllGuitars() {
        return new ArrayList<>(repository.findAll());
    }

    @Override
    public List<Guitar> findByPriceGreaterThan(Integer price) {
        return repository.findByPriceGreaterThan(price);
    }

    @Override
    public void addGuitarsToShop(List<Guitar> guitars, Long id) throws GuitarServiceException {
        for (Guitar g : guitars) {
            Optional<Guitar> guitarOpt = repository.findById(g.getId());
            if (guitarOpt.isEmpty()) {
                throw new GuitarServiceException("Guitar with id " + g.getId() + " does not exist!");
            }
            Guitar retrievedGuitar = guitarOpt.get();
            retrievedGuitar.setShop(new Shop(id));
            repository.save(retrievedGuitar);
        }
    }
}
