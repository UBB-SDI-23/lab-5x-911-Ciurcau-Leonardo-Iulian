package com.example.labsdi.service;

import com.example.labsdi.domain.*;
import com.example.labsdi.domain.dto.SortedShopDTO;
import com.example.labsdi.service.exception.TransactionServiceException;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.util.Pair;

import java.util.List;

public interface ITransactionService {
    boolean containsTransaction(Long id);
    Transaction addTransaction(Transaction transaction) throws TransactionServiceException;
    Transaction getTransaction(Long id) throws TransactionServiceException;
    List<Transaction> getFirst100Transactions();
    void removeTransaction(Long id) throws TransactionServiceException;
    Transaction updateTransaction(Transaction transaction, Long id) throws TransactionServiceException;
    List<Transaction> getAllTransactions();
    boolean containsProduct(Product product);
    List<SortedShopDTO> getAllShopsSorted(); // sorted by the number of other shops their clients bought from
}
