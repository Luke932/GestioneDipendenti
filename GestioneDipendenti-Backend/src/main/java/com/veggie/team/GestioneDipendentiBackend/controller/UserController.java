package com.veggie.team.GestioneDipendentiBackend.controller;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.service.OrariService;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("/user")
@RestController
public class UserController {
    private OrariService os;

    public UserController(OrariService os) {
        this.os = os;
    }

    @PostMapping("/ingresso/{id}")
    public boolean impostaDataIngresso(@PathVariable int id) {
        return os.inserisciDataIngresso(id);
    }

    @PostMapping("/uscita/{id}")
    public boolean impostaDataUscita(@PathVariable int id) {
        return os.inserisciDataUscita(id);
    }
}
