package com.example.labsdi.controller;

import com.example.labsdi.domain.IDTOConvertable;
import com.example.labsdi.domain.Transaction;
import com.example.labsdi.domain.dto.Count;
import com.example.labsdi.domain.dto.DTO;
import com.example.labsdi.domain.dto.SortedShopDTO;
import com.example.labsdi.domain.dto.TransactionDTO;
import com.example.labsdi.service.ITransactionService;
import com.example.labsdi.service.exception.TransactionServiceException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
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
    public Slice<TransactionDTO> getTransactionsPage(@PathVariable("page") @NotNull @PositiveOrZero Integer page) {
        return transactionService.getTransactionsPage(page)
                .map(t -> (TransactionDTO)t.toDTO());
    }

    @GetMapping("/transactions")
    public List<DTO> getFirst100Transactions() {
        return transactionService.getFirst100Transactions().stream()
                .map(IDTOConvertable::toDTO)
                .toList();
    }

    @PutMapping("/transactions/{id}")
    public Transaction
    updateTransaction(@RequestBody @Valid Transaction transaction, @PathVariable("id") @NotNull @PositiveOrZero Long id)
            throws TransactionServiceException {
        return transactionService.updateTransaction(transaction, id);
    }

    @DeleteMapping("/transactions/{id}")
    public String removeTransaction(@PathVariable("id") @NotNull @PositiveOrZero Long id) throws TransactionServiceException {
        transactionService.removeTransaction(id);
        return "Deleted Successfully";
    }

    @GetMapping("/transactions/{id}")
    public Transaction getTransaction(@PathVariable("id") @NotNull @PositiveOrZero Long id) throws TransactionServiceException {
        return transactionService.getTransaction(id);
    }

    @GetMapping("/transactions/count/{username}")
    public Count countByUsername(@PathVariable("username") @NotBlank String username) {
        return new Count(transactionService.countByUsername(username));
    }

    @GetMapping("/transactions/dto/{id}")
    public TransactionDTO getTransactionDTO(@PathVariable("id") @NotNull @PositiveOrZero Long id) throws TransactionServiceException {
        return (TransactionDTO) transactionService.getTransaction(id).toDTO();
    }

    @GetMapping("/shops/sorted")
    public List<SortedShopDTO> getAllShopsSorted() {
        return transactionService.getAllShopsSorted();
    }
}
