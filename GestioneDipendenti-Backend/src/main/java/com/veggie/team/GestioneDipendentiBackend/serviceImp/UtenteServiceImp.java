package com.veggie.team.GestioneDipendentiBackend.serviceImp;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import com.veggie.team.GestioneDipendentiBackend.entity.Role;
import com.veggie.team.GestioneDipendentiBackend.entity.Utente;
import com.veggie.team.GestioneDipendentiBackend.repository.UtenteRepo;
import com.veggie.team.GestioneDipendentiBackend.service.UtenteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtenteServiceImp implements UtenteService {
    private UtenteRepo ur;

    public UtenteServiceImp(UtenteRepo ur) {
        this.ur = ur;
    }

    @Override
    public Optional<Utente> cercaPerUsernameEPassword(Utente utente) {
        return ur.findByUsernameAndPassword(utente.getUsername(), utente.getPassword());
    }

    @Override
    public List<Utente> trovaTuttiUtenti() {
        return ur.findByRuolo(Role.valueOf("USER"));
    }

    @Override
    public Utente trovaSingoloUtente(int id) {
        List<Utente> list = ur.findById(id);
        return list.get(0);
    }

    @Override
    public Utente inserisciUtenteAdmin(Utente utente) {
        Utente admin = utente;
        admin.setRuolo(Role.valueOf("ADMIN"));
        return ur.save(admin);
    }

    @Override
    public Utente inserisciUtenteUser(Utente utente) {
        Utente ut = utente;
        ut.setRuolo(Role.valueOf("USER"));
        return ur.save(ut);
    }

    @Override
    public Utente modificaUtente(int id, Utente utente) {
        Utente utenteInDb = trovaSingoloUtente(id);
        Utente ut = utente;
        ut.setIdUtente(utenteInDb.getIdUtente());
        if (ut.getRuolo() == null)
            ut.setRuolo(utenteInDb.getRuolo());
        return ur.save(ut);
    }

    @Override
    public void eliminaUtente(int id) {
        ur.deleteById(id);
    }
}
