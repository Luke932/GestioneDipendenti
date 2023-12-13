package com.veggie.team.GestioneDipendentiBackend.repository;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrariRepo extends JpaRepository<Orari, Integer> {
    public List<Orari> findByUtente_IdUtente(int id);
    public List<Orari> findById(int id);

}
