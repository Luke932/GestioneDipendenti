import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {
utenti: any = [];
username: any;
editingUserId: number | null = null;
editingNome: string | null = null;
editingCognome: string | null = null;
editingUsername: string | null = null;
editingPassword: string | null = null;
editingRuolo: string | null = null;
isEditing: boolean = false;

constructor(private utentiSrv: UtentiService, private router: Router){}

ngOnInit(): void {
  this.username = localStorage.getItem('username');
  console.log(this.username);
  this.getAllUtenti();
}

getAllUtenti(){
  this.utentiSrv.getAllUtenti().subscribe(
    utenti => {
      this.utenti = utenti;
      console.log(utenti);

    },
    error => {
      console.error('Errore durante il recupero degli utenti: ', error);
    }
  );
}

deleteUtente(id:number){
  this.utentiSrv.deleteUser(id).subscribe(
    response => {
      console.log("utente eliminato con successo");
      this.getAllUtenti();
    },
    error => {
      console.error("Errore durante l'eliminazione dell'utente", error);
    }
  );
}

editUtente(id: number, nome: string, cognome: string, username:string,password:string, ruolo:string) {
  this.editingUserId = id;
  this.editingNome = nome;
  this.editingCognome = cognome;
  this.editingUsername = username;
  this.editingPassword = password;
  this.editingRuolo = ruolo;
  this.isEditing = true;
}

cancelEdit() {
  this.editingUserId = null;
  this.editingNome = null;
  this.editingCognome = null;
  this.editingUsername = null;
  this.editingPassword = null;
  this.editingRuolo = null;
  this.isEditing = false;
}

confirmEdit() {
  if (this.editingUserId !== null && this.editingNome !== null && this.editingCognome !== null && this.editingUsername !== null && this.editingPassword !== null && this.editingRuolo !== null) {
    const utenteModificato = {
      id: this.editingUserId,
      nome: this.editingNome,
      cognome: this.editingCognome,
      username: this.editingUsername,
      password: this.editingPassword,
      ruolo: this.editingRuolo,
    };

    this.utentiSrv.updateUser(this.editingUserId, utenteModificato).subscribe(
      response => {
        console.log('Utente modificato con successo');
        this.cancelEdit();
        this.getAllUtenti();
      },
      error => {
        console.error("Errore durante la modifica dell'utente", error);
      }
    );
  }
}

goToListaOrari(userId: number) {
  this.router.navigate(['/admin/lista', userId]);
}


}
