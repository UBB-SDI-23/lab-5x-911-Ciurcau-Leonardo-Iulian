package com.example.labsdi.service;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.Guitar;
import com.example.labsdi.repository.IClientRepository;
import com.example.labsdi.service.exception.ClientServiceException;
import com.example.labsdi.service.exception.GuitarServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClientService implements IClientService {
    @Autowired
    IClientRepository repository;
    @Override
    public boolean containsClient(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Client addClient(Client client) throws ClientServiceException {
        if (Objects.nonNull(client.getId()) && containsClient(client.getId()))
            throw new ClientServiceException("Client with id " + client.getId() + " already exists!");
        return repository.save(client);
    }

    @Override
    public Client getClient(Long id) throws ClientServiceException {
        Optional<Client> client = repository.findById(id);
        if (client.isEmpty())
            throw new ClientServiceException("Client with id " + id + " does not exist!");
        else
            return client.get();
    }

    @Override
    public List<Client> getFirst100Clients() {
        return repository.findFirst100By();
    }

    @Override
    public void removeClient(Long id) throws ClientServiceException {
        if (!containsClient(id))
            throw new ClientServiceException("Client with id " + id + " does not exist!");
        repository.deleteById(id);
    }

    @Override
    public Client updateClient(Client client, Long id) throws ClientServiceException {
        Optional<Client> clientOpt = repository.findById(id);
        if (clientOpt.isEmpty()) {
            throw new ClientServiceException("Client with id " + id + " does not exist!");
        }
        Client retrievedClient = clientOpt.get();
        if (Objects.nonNull(client.getName()) && !"".equals(client.getName()))
            retrievedClient.setName(client.getName());
        if (Objects.nonNull(client.getEmail()) && !"".equals(client.getEmail()))
            retrievedClient.setEmail(client.getEmail());
        if (Objects.nonNull(client.getAddress()) && !"".equals(client.getAddress()))
            retrievedClient.setAddress(client.getAddress());
        if (Objects.nonNull(client.getTelephoneNumber()) && !"".equals(client.getTelephoneNumber()))
            retrievedClient.setTelephoneNumber(client.getTelephoneNumber());
        if (Objects.nonNull(client.getBirthDate()))
            retrievedClient.setBirthDate(client.getBirthDate());
        return repository.save(retrievedClient);
    }

    @Override
    public List<Client> getAllClients() {
        return repository.findAll();
    }
}
