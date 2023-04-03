package com.example.labsdi.controller;

import com.example.labsdi.domain.Client;
import com.example.labsdi.service.ClientService;
import com.example.labsdi.service.IClientService;
import com.example.labsdi.service.exception.ClientServiceException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClientController {
    @Autowired
    private IClientService clientService;

    @PostMapping("/clients")
    public Client addClient(@Valid @RequestBody Client client) throws ClientServiceException {
        return clientService.addClient(client);
    }

    @GetMapping("/clients")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PutMapping("/clients/{id}")
    public Client
    updateClient(@RequestBody Client client, @PathVariable("id") Long id) throws ClientServiceException {
        return clientService.updateClient(client, id);
    }

    @DeleteMapping("/clients/{id}")
    public String removeClient(@PathVariable("id") Long id) throws ClientServiceException {
        clientService.removeClient(id);
        return "Deleted Successfully";
    }

    @GetMapping("/clients/{id}")
    public Client getClient(@PathVariable("id") Long id) throws ClientServiceException {
        return clientService.getClient(id);
    }
}
