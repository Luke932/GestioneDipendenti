package com.veggie.team.GestioneDipendentiBackend.controller;

import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/admin")
@RestController
public class AdminController {
    private UtenteService us;

    public AdminController(UtenteService us) {
        this.us = us;
    }

    @GetMapping("/")
    public List<Utente> leggiUtenti() {
        return us.trovaTuttiUtenti();
    }

    @GetMapping("/utenteSelezionato/{id}")
    public Utente leggiUtente(int id) {
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
}
