import { Component } from '@angular/core';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-aggiungi-utente',
  templateUrl: './aggiungi-utente.component.html',
  styleUrls: ['./aggiungi-utente.component.css']
})
export class AggiungiUtenteComponent {
  newUser: any = {};

  constructor(private utentiService: UtentiService) {}

  createUser() {
    const userData = this.createUserObject();

    this.utentiService.saveUser(userData).subscribe(
      response => {
        console.log('Utente creato con successo:', response);
        // Aggiorna la lista degli utenti se necessario
      },
      error => {
        console.error('Errore durante la creazione dell\'utente:', error);
      }
    );
  }

  private createUserObject() {
    return {
      nome: this.newUser.nome,
      cognome: this.newUser.cognome,
      username: this.newUser.username,
      password: this.newUser.password,
    };
  }

  createAdmin() {
    const adminData = this.createAdminObject();

    this.utentiService.saveAdmin(adminData).subscribe(
      response => {
        console.log('Admin creato con successo:', response);
        // Aggiorna la lista degli admin se necessario
      },
      error => {
        console.error('Errore durante la creazione dell\'admin:', error);
      }
    );
  }

  private createAdminObject() {
    return {
      nome: this.newUser.nome,
      cognome: this.newUser.cognome,
      username: this.newUser.username,
      password: this.newUser.password,
    };
  }
}
