package com.example.labsdi;

import com.example.labsdi.domain.Guitar;
import com.example.labsdi.repository.IGuitarRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = LabSdiApplication.class)
@DataJpaTest
public class GuitarRepositoryTests {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private IGuitarRepository repository;

    @Test
    public void findByPriceGreaterThanTest() {
        List<Guitar> guitars = List.of(new Guitar(2000, 2001,
                        "model1", "type1", "color1"),
                new Guitar( 3000, 2002,
                        "model2", "type2", "color2"),
                new Guitar( 100, 2003,
                        "model3", "type3", "color3")
        );

        for (Guitar guitar : guitars)
            entityManager.persist(guitar);
        entityManager.flush();

        List<Guitar> filteredGuitars = repository.findByPriceGreaterThan(100);
        assertEquals(2, filteredGuitars.size());
        assertTrue(filteredGuitars.contains(guitars.get(0)));
        assertTrue(filteredGuitars.contains(guitars.get(1)));
        assertFalse(filteredGuitars.contains(guitars.get(2)));

        filteredGuitars = repository.findByPriceGreaterThan(3000);
        assertEquals(0, filteredGuitars.size());

        filteredGuitars = repository.findByPriceGreaterThan(0);
        assertEquals(3, filteredGuitars.size());
    }
}
