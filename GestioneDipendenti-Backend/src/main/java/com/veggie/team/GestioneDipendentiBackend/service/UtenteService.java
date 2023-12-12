package com.veggie.team.GestioneDipendentiBackend.service;

import com.veggie.team.GestioneDipendentiBackend.entity.Utente;

import java.util.List;
import java.util.Optional;

public interface UtenteService {
    public Optional<Utente> cercaPerUsernameEPassword(Utente utente);
    public List<Utente> trovaTuttiUtenti();
    public Utente inserisciUtenteAdmin(Utente utente);
    public Utente inserisciUtenteUser(Utente utente);
    public Utente modificaUtenteUser(Utente utente);
}
