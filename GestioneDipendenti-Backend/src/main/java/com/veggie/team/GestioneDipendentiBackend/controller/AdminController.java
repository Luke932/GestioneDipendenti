package com.veggie.team.GestioneDipendentiBackend.controller;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.service.OrariService;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/admin")
@RestController
public class AdminController {
    private UtenteService us;
    private OrariService os;

    @Autowired
    public AdminController(UtenteService us, OrariService os) {
        this.us = us;
        this.os = os;
    }

    @GetMapping("/")
    public List<Utente> leggiUtenti() {
        return us.trovaTuttiUtenti();
    }

    @GetMapping("/utenteSelezionato/{id}")
    public Utente leggiUtente(@PathVariable int id) {
        return us.trovaSingoloUtente(id);
    }

    @PostMapping("/inserimento/admin")
    public Utente inserisciAdmin(@RequestBody Utente utente) {
        return us.inserisciUtenteAdmin(utente);
    }

    @PostMapping("/inserimento/user")
    public Utente inserisciUser(@RequestBody Utente utente) {
        return us.inserisciUtenteUser(utente);
    }

    @PutMapping("/modifica/{id}")
    public Utente modificaUtente(@PathVariable int id, @RequestBody Utente utente) {
        return us.modificaUtente(id, utente);
    }

    @DeleteMapping("/elimina/{id}")
    public Utente eliminaUtente(@PathVariable int id) {
        Utente utente = us.trovaSingoloUtente(id);
        us.eliminaUtente(id);
        return utente;
    }

    @GetMapping("/utenteSelezionato/{id}/orari")
    public List<Orari> leggiStoricoOrari(@PathVariable int id) {
        return os.trovaOrariSingoloUtente(id);
    }

    @DeleteMapping("utenteSelezionato/{id}/eliminaTuttiOrari")
    public boolean eliminaStoricoOrari(@PathVariable int id) {
        List<Orari> orari = us.trovaSingoloUtente(id).getOrari();
        os.eliminaTuttiOrariSingoloUtente(orari, id);
        return true;
    }
}
