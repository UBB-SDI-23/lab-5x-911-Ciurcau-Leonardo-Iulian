package com.example.labsdi.service;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.Courier;
import com.example.labsdi.repository.ICourierRepository;
import com.example.labsdi.service.exception.CourierServiceException;
import com.example.labsdi.service.exception.CourierServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CourierService implements ICourierService {
    @Autowired
    ICourierRepository repository;
    @Override
    public boolean containsCourier(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Courier addCourier(Courier courier) throws CourierServiceException {
        if (Objects.nonNull(courier.getId()) && containsCourier(courier.getId())) {
            throw new CourierServiceException("Courier with id " + courier.getId() + " already exists!");
        }
        System.out.println(courier);
        return repository.save(courier);
    }

    @Override
    public Courier getCourier(Long id) throws CourierServiceException {
        Optional<Courier> courier = repository.findById(id);
        if (courier.isEmpty())
            throw new CourierServiceException("Courier with id " + id + " does not exist!");
        else
            return courier.get();
    }

    @Override
    public List<Courier> getFirst100Couriers() {
        return repository.findFirst100By();
    }

    @Override
    public void removeCourier(Long id) throws CourierServiceException {
        if (!containsCourier(id)) {
            throw new CourierServiceException("Courier with id " + id + " does not exist!");
        }
        repository.deleteById(id);
    }

    @Override
    public Courier updateCourier(Courier courier, Long id) throws CourierServiceException {
        Optional<Courier> courierOpt = repository.findById(id);
        if (courierOpt.isEmpty()) {
            throw new CourierServiceException("Courier with id " + id + " does not exist!");
        }
        Courier retrievedCourier = courierOpt.get();
        if (Objects.nonNull(courier.getTelephoneNumber()) && !"".equals(courier.getTelephoneNumber()))
            retrievedCourier.setTelephoneNumber(courier.getTelephoneNumber());
        if (Objects.nonNull(courier.getName()) && !"".equals(courier.getName()))
            retrievedCourier.setName(courier.getName());
        if (Objects.nonNull(courier.getEmail()) && !"".equals(courier.getEmail()))
            retrievedCourier.setEmail(courier.getEmail());
        if (Objects.nonNull(courier.getAddress()) && !"".equals(courier.getAddress()))
            retrievedCourier.setAddress(courier.getAddress());
        if (Objects.nonNull(courier.getDeliveryPrice()))
            retrievedCourier.setDeliveryPrice(courier.getDeliveryPrice());
        return repository.save(retrievedCourier);
    }

    @Override
    public List<Courier> getAllCouriers() {
        return new ArrayList<>(repository.findAll());
    }
}
