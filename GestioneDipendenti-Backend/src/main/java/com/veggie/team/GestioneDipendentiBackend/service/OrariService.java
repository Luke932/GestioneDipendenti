package com.veggie.team.GestioneDipendentiBackend.service;

import com.veggie.team.GestioneDipendentiBackend.entity.Orari;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrariService {
    public boolean inserisciDataIngresso(int id);
    public boolean inserisciDataUscita(int id);
    public List<Orari> trovaOrariSingoloUtente(int id);
    //@Transactional
    public void eliminaTuttiOrariSingoloUtente(List<Orari> orari, int id);
}
