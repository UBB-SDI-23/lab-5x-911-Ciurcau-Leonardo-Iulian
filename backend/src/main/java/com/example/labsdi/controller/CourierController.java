package com.example.labsdi.controller;

import com.example.labsdi.domain.Courier;
import com.example.labsdi.domain.dto.Count;
import com.example.labsdi.domain.dto.CourierDTO;
import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.SimpleCourierDTO;
import com.example.labsdi.service.ICourierService;
import com.example.labsdi.service.ICourierService;
import com.example.labsdi.service.exception.CourierServiceException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourierController {
    @Autowired
    private ICourierService courierService;

    @PostMapping("/couriers")
    public Courier addCourier(@Valid @RequestBody Courier courier) throws CourierServiceException {
        return courierService.addCourier(courier);
    }

    @GetMapping("/couriers/all")
    public List<Courier> getAllCouriers() {
        return courierService.getAllCouriers();
    }

    @GetMapping("/couriers")
    public List<Courier> getFirst100Couriers() {
        return courierService.getFirst100Couriers();
    }

    @GetMapping("/couriers/page/{page}")
    public Slice<CourierDTO> getCouriersPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return courierService.getCourierPage(page)
                .map(c -> (CourierDTO)c.toDTO());
    }

    @GetMapping("/couriers/simple/page/{page}")
    public Slice<SimpleCourierDTO> getSimpleCouriersPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return courierService.getCourierPage(page)
                .map(c -> (SimpleCourierDTO)c.toSimpleDTO());
    }

    @GetMapping("/couriers/containsName/{name}/page/{page}")
    public Slice<SimpleCourierDTO> getCourierContainsNamePage(@PathVariable("name") @NotBlank String name,
                                                              @PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return courierService.getCourierContainsNamePage(name, page)
                .map(c -> (SimpleCourierDTO) c.toSimpleDTO());
    }

    @GetMapping("/couriers/count/{username}")
    public Count getCountByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(courierService.countByUsername(username));
    }

    @PutMapping("/couriers/{id}")
    public Courier
    updateCourier(@RequestBody Courier courier, @PathVariable("id") @NotNull Long id) throws CourierServiceException {
        return courierService.updateCourier(courier, id);
    }

    @DeleteMapping("/couriers/{id}")
    public String removeCourier(@PathVariable("id") @NotNull Long id) throws CourierServiceException {
        courierService.removeCourier(id);
        return "Deleted Successfully";
    }

    @GetMapping("/couriers/{id}")
    public DTO getCourier(@PathVariable("id") @NotNull Long id) throws CourierServiceException {
        return courierService.getCourier(id).toDTO();
    }
}
