package com.example.labsdi.service;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.service.exception.CourierServiceException;

import java.util.List;

public interface ICourierService {
    boolean containsCourier(Long id);
    Courier addCourier(Courier courier) throws CourierServiceException;
    Courier getCourier(Long id) throws CourierServiceException;
    List<Courier> getFirst100Couriers();
    void removeCourier(Long id) throws CourierServiceException;
    Courier updateCourier(Courier courier, Long id) throws CourierServiceException;
    List<Courier> getAllCouriers();
}
