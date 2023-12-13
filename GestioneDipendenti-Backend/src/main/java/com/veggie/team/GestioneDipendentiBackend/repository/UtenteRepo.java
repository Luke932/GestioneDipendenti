package com.veggie.team.GestioneDipendentiBackend.repository;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Role;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtenteRepo extends JpaRepository<Utente, Integer> {
    public Optional<Utente> findByUsernameAndPassword(String username, String password);
    public List<Utente> findByRuolo(Role ruolo);
    public List<Utente> findById(int id);
    //@Transactional
    //void deleteByOrariIn(List<Orari> orari);
}
