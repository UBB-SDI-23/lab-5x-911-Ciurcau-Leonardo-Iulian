package com.example.labsdi.controller;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.dto.Count;
import com.example.labsdi.domain.dto.SimpleClientDTO;
import com.example.labsdi.service.ClientService;
import com.example.labsdi.service.IClientService;
import com.example.labsdi.service.exception.ClientServiceException;
import io.swagger.v3.core.util.Json;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
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

    @GetMapping("/clients/all")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/clients")
    public List<Client> getFirst100Clients() {
        return clientService.getFirst100Clients();
    }

    @GetMapping("/clients/page/{page}")
    public Slice<Client> getClientsPage(@PathVariable("page") Integer page) {
        return clientService.getClientsPage(page);
    }

    @GetMapping("/clients/simple/page/{page}")
    public Slice<SimpleClientDTO> getClientsSimplePage(@PathVariable("page") Integer page) {
        return clientService.getClientsPage(page)
                .map(c -> (SimpleClientDTO) c.toSimpleDTO());
    }

    @GetMapping("/clients/count")
    public Count getCount() {
        return new Count(clientService.getCount());
    }

    @GetMapping("/clients/containsName/{name}/page/{page}")
    public Slice<SimpleClientDTO> getClientContainsNamePage(@PathVariable("name") String name,
                                                            @PathVariable("page") Integer page) {
        return clientService.getClientContainsNamePage(name, page)
                .map(c -> (SimpleClientDTO) c.toSimpleDTO());
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
