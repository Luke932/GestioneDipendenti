package com.veggie.team.GestioneDipendentiBackend.serviceImp;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.repository.OrariRepo;
import com.veggie.team.GestioneDipendentiBackend.repository.UtenteRepo;
import com.veggie.team.GestioneDipendentiBackend.service.OrariService;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class OrariServiceImp implements OrariService {
    private OrariRepo or;
    private UtenteRepo ur;
    private UtenteService us;

    public OrariServiceImp(OrariRepo or, UtenteRepo ur, UtenteService us) {
        this.or = or;
        this.ur = ur;
        this.us = us;
    }

    /*AL MOMENTO ORARIREPO NON SERVE*/

    @Override
    public Orari inserisciDataIngresso(int id) {
        Orari ingresso = new Orari();
        ingresso.setDataIngresso(LocalDate.now());
        Utente ut = us.trovaSingoloUtente(id);
        ut.getOrari().add(ingresso);
        ur.save(ut);
        return ingresso;
    }
}
