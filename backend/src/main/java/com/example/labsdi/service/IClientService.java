package com.example.labsdi.service;

import com.example.labsdi.domain.Client;
import com.example.labsdi.domain.Guitar;
import com.example.labsdi.service.exception.ClientServiceException;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface IClientService {
    boolean containsClient(Long id);
    Client addClient(Client client) throws ClientServiceException;
    Client getClient(Long id) throws ClientServiceException;
    List<Client> getFirst100Clients();
    Slice<Client> getClientsPage(Integer page);
    void removeClient(Long id) throws ClientServiceException;
    Client updateClient(Client client, Long id) throws ClientServiceException;
    List<Client> getAllClients();
}
