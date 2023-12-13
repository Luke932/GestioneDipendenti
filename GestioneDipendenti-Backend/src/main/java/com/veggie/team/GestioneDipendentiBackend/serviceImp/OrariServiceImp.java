package com.veggie.team.GestioneDipendentiBackend.serviceImp;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.repository.OrariRepo;
import com.veggie.team.GestioneDipendentiBackend.repository.UtenteRepo;
import com.veggie.team.GestioneDipendentiBackend.service.OrariService;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class OrariServiceImp implements OrariService {
    private OrariRepo or;
    private UtenteRepo ur;
    private UtenteService us;

    @Autowired
    public OrariServiceImp(OrariRepo or, UtenteRepo ur, UtenteService us) {
        this.or = or;
        this.ur = ur;
        this.us = us;
    }

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

    @Override
    public List<Orari> trovaOrariSingoloUtente(int id) {
        return or.findByUtente_IdUtente(id);
    }

    @Override
    public Orari modificaSingoloOrari(int id, int idOra, Orari orario) {
        Utente ut = us.trovaSingoloUtente(id);
        Orari orarioTemp = or.findById(idOra).get(0);
        orarioTemp = orario;
        orarioTemp.setIdOrari(idOra);
        orarioTemp.setUtente(ut);
        return or.save(orarioTemp);
    }

    @Override
    public void eliminaTuttiOrariSingoloUtente(List<Orari> orari, int id) {
        Utente utente = us.trovaSingoloUtente(id);
        List<Orari> orariTemp = utente.getOrari();
        utente.setOrari(Collections.emptyList());
        ur.save(utente);
        for (Orari orario : orariTemp) {
            orario.setUtente(null);  // Remove reference to Utente to avoid constraints
            or.delete(orario);
        }
    }
}
