package com.veggie.team.GestioneDipendentiBackend.serviceImp;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.repository.OrariRepo;
import com.veggie.team.GestioneDipendentiBackend.repository.UtenteRepo;
import com.veggie.team.GestioneDipendentiBackend.service.OrariService;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

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
    public boolean inserisciDataIngresso(int id) {
        Utente ut = us.trovaSingoloUtente(id);
        if (!ut.getOrari().isEmpty() && ut.getOrari().get(ut.getOrari().size() - 1).getDataUscita() == null)
            return false;


        Orari ingresso = new Orari();
        ingresso.setDataIngresso(new Date(System.currentTimeMillis()));
        ingresso.setUtente(ut);
        ut.getOrari().add(ingresso);
        ur.save(ut);
        return true;
    }

    @Override
    public boolean inserisciDataUscita(int id) {
        Utente ut = us.trovaSingoloUtente(id);
        if (ut.getOrari().isEmpty() || ut.getOrari().get(ut.getOrari().size() - 1).getDataUscita() != null)
            return false;

        ut.getOrari().get(ut.getOrari().size() - 1) //ottieni l'ultimo elemento
                .setDataUscita(new Date(System.currentTimeMillis())); // imposta l'ora di uscita
        ur.save(ut);
        return true;
    }
}
