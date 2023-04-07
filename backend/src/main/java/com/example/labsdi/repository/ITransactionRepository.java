package com.example.labsdi.repository;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findFirst100By();
}
