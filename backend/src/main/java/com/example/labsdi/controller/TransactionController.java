package com.example.labsdi.controller;

import com.example.labsdi.domain.IDTOConvertable;
import com.example.labsdi.domain.Transaction;
import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.SortedShopDTO;
import com.example.labsdi.domain.dto.TransactionDTO;
import com.example.labsdi.service.ITransactionService;
import com.example.labsdi.service.exception.TransactionServiceException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    ITransactionService transactionService;
    @PostMapping("/transactions")
    public Transaction
    addTransaction(@Valid @RequestBody Transaction transaction) throws TransactionServiceException {
        return transactionService.addTransaction(transaction);
    }

    @GetMapping("/transactions/all")
    public List<DTO> getAllTransactions() {
        return transactionService.getAllTransactions().stream()
                .map(IDTOConvertable::toDTO)
                .toList();
    }

    @GetMapping("/transactions/page/{page}")
    public List<TransactionDTO> getTransactionsPage(@PathVariable("page") Integer page) {
        return transactionService.getTransactionsPage(page).stream()
                .map(t -> (TransactionDTO)t.toDTO())
                .toList();
    }

    @GetMapping("/transactions")
    public List<DTO> getFirst100Transactions() {
        return transactionService.getFirst100Transactions().stream()
                .map(IDTOConvertable::toDTO)
                .toList();
    }

    @PutMapping("/transactions/{id}")
    public Transaction
    updateTransaction(@RequestBody Transaction transaction, @PathVariable("id") Long id)
            throws TransactionServiceException {
        return transactionService.updateTransaction(transaction, id);
    }

    @DeleteMapping("/transactions/{id}")
    public String removeTransaction(@PathVariable("id") Long id) throws TransactionServiceException {
        transactionService.removeTransaction(id);
        return "Deleted Successfully";
    }

    @GetMapping("/transactions/{id}")
    public Transaction getTransaction(@PathVariable("id") Long id) throws TransactionServiceException {
        return transactionService.getTransaction(id);
    }

    @GetMapping("/shops/sorted")
    public List<SortedShopDTO> getAllShopsSorted() {
        return transactionService.getAllShopsSorted();
    }
}
